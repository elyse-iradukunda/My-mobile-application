import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tool Rental Rwanda - Rent Tools & Hire Workers',
  description: 'Connect with tool owners and skilled workers across Rwanda. Rent equipment, find jobs, and grow your business.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
