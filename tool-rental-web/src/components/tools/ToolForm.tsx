'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/constants/categories';

interface ToolFormData {
  name: string;
  description: string;
  category: string;
  dailyRate: number;
  location: string;
}

export const ToolForm: React.FC<{ onSubmit: (data: ToolFormData) => Promise<void>; loading?: boolean }> = ({
  onSubmit,
  loading = false,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ToolFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <Input
        label="Tool Name"
        placeholder="e.g. Bosch Hammer Drill"
        {...register('name', { required: 'Tool name is required' })}
        error={errors.name?.message}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Daily Rate (RWF)"
        type="number"
        placeholder="15000"
        {...register('dailyRate', { required: 'Daily rate is required', valueAsNumber: true })}
        error={errors.dailyRate?.message}
      />

      <Input
        label="Location"
        placeholder="e.g. Kigali, Nyarugenge"
        {...register('location', { required: 'Location is required' })}
        error={errors.location?.message}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Describe the tool specifications and condition..."
          {...register('description')}
        />
      </div>

      <Button type="submit" loading={loading} fullWidth>
        Save Tool
      </Button>
    </form>
  );
};
