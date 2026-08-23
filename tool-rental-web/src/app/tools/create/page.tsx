// app/tools/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCreateTool } from '@/hooks/useTools';

const categories = [
  'Construction',
  'Agriculture',
  'Photography',
  'Events',
  'Music',
  'Electronics',
  'Transportation',
  'House Services',
];

export default function CreateToolPage() {
  const router = useRouter();
  const { mutate: createTool, isPending } = useCreateTool();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const category = String(formData.get('category') ?? '').trim();
    const location = String(formData.get('location') ?? '').trim();
    const pricePerDay = Number(formData.get('pricePerDay'));
    const depositRaw = formData.get('deposit');
    const deposit = depositRaw === null || depositRaw === '' ? undefined : Number(depositRaw);

    if (!title || !category || !location || !Number.isFinite(pricePerDay) || pricePerDay <= 0) {
      setError('Please provide a valid title, category, location, and price per day.');
      return;
    }

    const data = {
      title,
      description,
      category,
      pricePerDay,
      deposit: deposit !== undefined && Number.isFinite(deposit) ? deposit : undefined,
      location,
      images: [],
    };

    createTool(data, {
      onSuccess: () => {
        router.push('/tools');
      },
      onError: (err: unknown) => {
        const message = err instanceof Error && 'response' in err ?
          (err as { response?: { data?: { message?: string } } }).response?.data?.message :
          undefined;
        setError(message || 'Failed to create tool');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/tools" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">List a Tool</h1>
            <p className="text-sm text-gray-500">Share your tools and earn money</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g., Concrete Mixer 500L"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your tool, its condition, features..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 mb-1">
                Price per Day (RWF) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                required
                min={1}
                placeholder="25000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-1">
                Deposit (RWF)
              </label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                min={0}
                placeholder="50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              placeholder="e.g., Kigali, Rwanda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Link
              href="/tools"
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Listing...
                </>
              ) : (
                'List Tool'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}