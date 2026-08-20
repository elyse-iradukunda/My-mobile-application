import React from 'react';
import { Booking } from '@/types/booking.types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <Card className="hover:shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-900">{booking.tool?.name || `Booking #${booking.id}`}</h4>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
          </p>
          <p className="text-base font-bold text-primary mt-2">
            RWF {booking.totalPrice.toLocaleString()}
          </p>
        </div>
        <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
          {booking.status}
        </Badge>
      </div>
    </Card>
  );
};
