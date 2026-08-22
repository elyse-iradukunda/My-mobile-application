'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Grid3x3, List, AlertCircle } from 'lucide-react';
import { ToolCard, Tool } from '@/components/tools/ToolCard';

// Hardcoded tools data for testing
const toolsData: Tool[] = [
  {
    id: '1',
    title: 'Concrete Mixer 500L',
    description: 'Heavy-duty concrete mixer for construction projects. Perfect for building foundations, columns, and slabs. Durable and easy to operate.',
    category: 'Construction',
    pricePerDay: 25000,
    deposit: 50000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=300&fit=crop'],
    rating: 4.8,
    totalReviews: 24,
    ownerId: 'owner1',
    ownerName: 'John Doe',
    distance: '2.5 km',
    availability: true,
    createdAt: new Date('2026-01-15'),
  },
  {
    id: '2',
    title: 'Professional Camera Kit',
    description: 'Canon EOS 5D Mark IV with 24-70mm lens, extra batteries, and memory cards. Perfect for weddings, events, and professional photography.',
    category: 'Photography',
    pricePerDay: 35000,
    deposit: 200000,
    location: 'Musanze, Rwanda',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop'],
    rating: 4.9,
    totalReviews: 18,
    ownerId: 'owner2',
    ownerName: 'Jane Smith',
    distance: '1.2 km',
    availability: true,
    createdAt: new Date('2026-02-20'),
  },
  {
    id: '3',
    title: 'Sound System Pro',
    description: 'Professional PA system with speakers, mixer, and microphones. Suitable for concerts, weddings, and corporate events. Clear sound quality.',
    category: 'Events',
    pricePerDay: 45000,
    deposit: 100000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=300&fit=crop'],
    rating: 4.7,
    totalReviews: 12,
    ownerId: 'owner3',
    ownerName: 'Mike Johnson',
    distance: '3.0 km',
    availability: false,
    createdAt: new Date('2026-03-10'),
  },
  {
    id: '4',
    title: 'Tractor with Trailer',
    description: 'Powerful tractor with detachable trailer for agricultural work. Perfect for farming, transportation, and land preparation.',
    category: 'Agriculture',
    pricePerDay: 55000,
    deposit: 150000,
    location: 'Rwamagana, Rwanda',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop'],
    rating: 4.6,
    totalReviews: 9,
    ownerId: 'owner4',
    ownerName: 'Peter Ndagijimana',
    distance: '5.5 km',
    availability: true,
    createdAt: new Date('2026-04-05'),
  },
  {
    id: '5',
    title: 'DJ Equipment Package',
    description: 'Professional DJ controller, speakers, lighting, and headphones. Perfect for parties, clubs, and events.',
    category: 'Music',
    pricePerDay: 30000,
    deposit: 80000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1571266028243-e3733cf0b7c0?w=500&h=300&fit=crop'],
    rating: 4.9,
    totalReviews: 15,
    ownerId: 'owner5',
    ownerName: 'DJ Kigali',
    distance: '1.8 km',
    availability: true,
    createdAt: new Date('2026-05-12'),
  },
  {
    id: '6',
    title: 'Laptop Bundle (10 units)',
    description: '10 Dell Latitude laptops with Intel i5, 8GB RAM, 256GB SSD. Perfect for training centers, workshops, and temporary offices.',
    category: 'Electronics',
    pricePerDay: 50000,
    deposit: 200000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop'],
    rating: 4.5,
    totalReviews: 7,
    ownerId: 'owner6',
    ownerName: 'Tech Solutions Ltd',
    distance: '3.2 km',
    availability: true,
    createdAt: new Date('2026-06-01'),
  },
  {
    id: '7',
    title: 'LED Lighting System',
    description: 'Complete LED lighting system for events and concerts. Includes 4 moving heads, 8 par lights, and control console.',
    category: 'Events',
    pricePerDay: 40000,
    deposit: 120000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop'],
    rating: 4.8,
    totalReviews: 11,
    ownerId: 'owner7',
    ownerName: 'Lighting Pro',
    distance: '2.0 km',
    availability: false,
    createdAt: new Date('2026-07-20'),
  },
  {
    id: '8',
    title: 'Construction Tools Set',
    description: 'Complete construction tools set including drills, saws, hammers, measuring tools, and safety equipment.',
    category: 'Construction',
    pricePerDay: 20000,
    deposit: 40000,
    location: 'Kigali, Rwanda',
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=300&fit=crop'],
    rating: 4.3,
    totalReviews: 6,
    ownerId: 'owner8',
    ownerName: 'Tools R Us',
    distance: '4.0 km',
    availability: true,
    createdAt: new Date('2026-08-01'),
  },
];

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>(toolsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search query
  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRetry = () => {
    setError(null);
    setTools(toolsData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
              <p className="text-sm text-gray-500">
                {filteredTools.length} tools available for rent
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              {/* Add Button */}
              <Link
                href="/tools/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tool</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRetry}
              className="text-red-700 font-medium hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        {searchQuery && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredTools.length} results for "{searchQuery}"
          </p>
        )}

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No tools found</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery ? `No results for "${searchQuery}"` : 'List your first tool and start earning'}
            </p>
            {!searchQuery && (
              <Link
                href="/tools/create"
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Tool
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}