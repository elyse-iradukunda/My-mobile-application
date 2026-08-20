import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary">
        Tool Rental Rwanda
      </Link>
    </header>
  );
};
