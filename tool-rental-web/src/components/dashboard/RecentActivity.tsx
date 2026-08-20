import React from 'react';
import { Card } from '@/components/ui/Card';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
}

export const RecentActivity: React.FC<{ activities?: ActivityItem[] }> = ({
  activities = [
    { id: '1', title: 'Tool rented: Concrete Mixer', time: '2 hours ago' },
    { id: '2', title: 'Payment received: RWF 45,000', time: '5 hours ago' },
    { id: '3', title: 'New worker booking: John Doe', time: '1 day ago' },
  ],
}) => {
  return (
    <Card title="Recent Activity">
      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-b-0">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
