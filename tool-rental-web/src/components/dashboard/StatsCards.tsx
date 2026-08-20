import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export const StatsCards: React.FC<{ stats: StatItem[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color || 'text-primary'} bg-gray-100 p-3 rounded-full`}>
                <Icon size={24} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
