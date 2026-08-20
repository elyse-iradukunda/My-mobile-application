'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';

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

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Tool Rental Rwanda</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button onClick={() => router.push('/register')}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Rent Tools. Hire Workers.
          <br />
          <span className="text-primary">Build Rwanda.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Connect with tool owners and skilled workers across Rwanda.
          Rent equipment, find jobs, and grow your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => router.push('/register')}>
            Create Account
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push('/search')}>
            Browse Tools
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Available Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <p className="font-medium">{category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
