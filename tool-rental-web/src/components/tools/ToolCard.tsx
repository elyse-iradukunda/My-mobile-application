import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, CheckCircle, XCircle } from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  images: string[];
  rating: number;
  totalReviews: number;
  ownerId: string;
  ownerName?: string;
  distance?: string;
  availability: boolean;
  createdAt: Date;
}

interface ToolCardProps {
  tool: Tool;
}

const categoryColors: Record<string, string> = {
  Construction: 'bg-red-100 text-red-700',
  Agriculture: 'bg-emerald-100 text-emerald-700',
  Photography: 'bg-blue-100 text-blue-700',
  Events: 'bg-teal-100 text-teal-700',
  Music: 'bg-yellow-100 text-yellow-700',
  Electronics: 'bg-purple-100 text-purple-700',
  Transportation: 'bg-pink-100 text-pink-700',
  'House Services': 'bg-indigo-100 text-indigo-700',
};

const categoryEmojis: Record<string, string> = {
  Construction: '🏗️',
  Agriculture: '🌾',
  Photography: '📷',
  Events: '🎪',
  Music: '🎵',
  Electronics: '💻',
  Transportation: '🚗',
  'House Services': '🏠',
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const categoryColor = categoryColors[tool.category] || 'bg-gray-100 text-gray-700';
  const categoryEmoji = categoryEmojis[tool.category] || '🔧';

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={tool.images?.[0] || '/images/tool-placeholder.jpg'}
            alt={tool.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {categoryEmoji} {tool.category}
          </span>
          {/* Availability Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
              tool.availability
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {tool.availability ? '● Available' : '● Unavailable'}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {tool.title}
              </h3>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 ml-1">
                  {tool.location || 'Kigali, Rwanda'}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-bold text-blue-600">
                {tool.pricePerDay.toLocaleString()} RWF
              </p>
              <p className="text-xs text-gray-400">/ day</p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1.5 font-semibold text-gray-900">
                {tool.rating || 4.5}
              </span>
              <span className="text-sm text-gray-400 ml-1">
                ({tool.totalReviews || 0} reviews)
              </span>
            </div>
            {tool.distance && (
              <div className="flex items-center text-gray-400 text-sm">
                <span>📍 {tool.distance}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};