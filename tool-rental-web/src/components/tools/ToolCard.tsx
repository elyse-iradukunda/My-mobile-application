// components/tools/ToolCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle, XCircle } from "lucide-react";

export interface Tool {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  images: string[];
  status: "available" | "rented" | "unavailable" | "pending";
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    fullName: string;
    phone: string;
  };
}

interface ToolCardProps {
  tool: Tool;
}

const categoryColors: Record<string, string> = {
  Construction: "bg-red-100 text-red-700",
  Agriculture: "bg-emerald-100 text-emerald-700",
  Photography: "bg-blue-100 text-blue-700",
  Events: "bg-teal-100 text-teal-700",
  Music: "bg-yellow-100 text-yellow-700",
  Electronics: "bg-purple-100 text-purple-700",
  Transportation: "bg-pink-100 text-pink-700",
  "House Services": "bg-indigo-100 text-indigo-700",
};

const categoryEmojis: Record<string, string> = {
  Construction: "🏗️",
  Agriculture: "🌾",
  Photography: "📷",
  Events: "🎪",
  Music: "🎵",
  Electronics: "💻",
  Transportation: "🚗",
  "House Services": "🏠",
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const categoryColor =
    categoryColors[tool.category] || "bg-gray-100 text-gray-700";
  const categoryEmoji = categoryEmojis[tool.category] || "🔧";
  const isAvailable = tool.status === "available";

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={tool.images?.[0] || "/images/tool-placeholder.jpg"}
            alt={tool.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}
          >
            {categoryEmoji} {tool.category}
          </span>
          {/* Status Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isAvailable ? "● Available" : "● Unavailable"}
          </span>
          {/* Rating Badge - Top Right */}
          <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {tool.rating || 0}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {tool.title}
            </h3>
            <div className="flex items-center mt-1">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 ml-1 truncate">
                {tool.location || "Kigali, Rwanda"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-gray-900">
                {tool.totalReviews || 0}
              </span>
              <span className="ml-1">reviews</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">
                {tool.pricePerDay.toLocaleString()} RWF
              </p>
              <p className="text-xs text-gray-400">/ day</p>
            </div>
          </div>

          {/* Owner info */}
          {tool.owner && (
            <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
              <span>By {tool.owner.fullName}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
