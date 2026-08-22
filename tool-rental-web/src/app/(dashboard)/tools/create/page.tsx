'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Camera, 
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

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

interface FormData {
  title: string;
  description: string;
  category: string;
  pricePerDay: string;
  deposit: string;
  location: string;
  availability: boolean;
}

export default function CreateToolPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    pricePerDay: '',
    deposit: '',
    location: '',
    availability: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 images
    if (images.length + files.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }

    // Check file size (max 5MB per file)
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setImages((prev) => [...prev, ...validFiles]);

    // Create preview URLs
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setError(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }
      if (!formData.pricePerDay || parseFloat(formData.pricePerDay) <= 0) {
        throw new Error('Valid price is required');
      }
      if (images.length === 0) {
        throw new Error('At least one image is required');
      }

      // TODO: Upload images to Cloudinary or similar service
      // For now, we'll just log the data
      console.log('Tool data:', {
        ...formData,
        pricePerDay: parseFloat(formData.pricePerDay),
        deposit: formData.deposit ? parseFloat(formData.deposit) : undefined,
        images: images.map((file) => file.name),
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setTimeout(() => {
        router.push('/tools');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to create tool');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Tool Listed Successfully!</h2>
          <p className="text-gray-500 mt-2">Your tool is now available for rent</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View All Tools
            </Link>
            <Link
              href="/tools/create"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Add Another
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/tools"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">List a Tool</h1>
            <p className="text-sm text-gray-500">Share your tools and earn money</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Upload Button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                >
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-2">Upload Photo</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Image Previews */}
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Upload up to 5 images (max 5MB each). First image will be the cover photo.
              </p>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Concrete Mixer 500L"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your tool, its condition, features, and any special instructions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                required
              />
            </div>

            {/* Price & Deposit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Day (RWF) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="pricePerDay"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                  placeholder="25000"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit (RWF)
                </label>
                <input
                  type="number"
                  id="deposit"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  placeholder="50000"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Optional - recommended for valuable items</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Kigali, Rwanda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                Available for rent
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/tools"
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
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