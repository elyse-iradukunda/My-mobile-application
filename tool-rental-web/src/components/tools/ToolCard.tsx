import React from 'react';
import { Tool } from '@/types/tool.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ToolCard: React.FC<{ tool: Tool; onRent?: (tool: Tool) => void }> = ({ tool, onRent }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-100 flex items-center justify-center -mx-6 -mt-4 mb-4">
        {tool.images && tool.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.images[0]} alt={tool.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-primary">RWF {tool.dailyRate.toLocaleString()}</span>
          <span className="text-xs text-gray-500"> / day</span>
        </div>
        {onRent && (
          <Button size="sm" onClick={() => onRent(tool)}>
            Rent Now
          </Button>
        )}
      </div>
    </Card>
  );
};
