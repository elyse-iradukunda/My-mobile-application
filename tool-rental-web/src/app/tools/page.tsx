// app/tools/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Calendar, User, Loader2 } from 'lucide-react';
import { useTool } from '@/hooks/useTools';

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: tool, isLoading, error } = useTool(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Tool not found</p>
          <Link href="/tools" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = tool.status === 'available';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Image */}
          <div className="relative h-96 w-full bg-gray-100">
            <Image
              src={tool.images?.[0] || '/images/tool-placeholder.jpg'}
              alt={tool.title}
              fill
              className="object-cover"
            />
            <span
              className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
                isAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {tool.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tool.rating || 0}</span>
                    <span>({tool.totalReviews || 0} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  {tool.pricePerDay.toLocaleString()} RWF
                </p>
                <p className="text-sm text-gray-400">per day</p>
                {tool.deposit && (
                  <p className="text-sm text-gray-500 mt-1">
                    Deposit: {tool.deposit.toLocaleString()} RWF
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{tool.description}</p>
            </div>

            {/* Location */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Location</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{tool.location}</span>
              </div>
            </div>

            {/* Owner */}
            {tool.owner && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Owner</h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tool.owner.fullName}</p>
                    <p className="text-sm text-gray-500">{tool.owner.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              {isAvailable ? (
                <Link
                  href={`/tools/${tool.id}/book`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-medium transition-colors"
                >
                  Rent This Tool
                </Link>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}
              <Link
                href={`/tools/${tool.id}/edit`}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg text-center font-medium transition-colors"
              >
                Edit Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}