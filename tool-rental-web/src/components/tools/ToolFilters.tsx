import React from 'react';
import { CATEGORIES } from '@/constants/categories';

interface ToolFiltersProps {
  category?: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ToolFilters: React.FC<ToolFiltersProps> = ({
  category,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
      <input
        type="text"
        placeholder="Search tools..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <select
        value={category || ''}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
