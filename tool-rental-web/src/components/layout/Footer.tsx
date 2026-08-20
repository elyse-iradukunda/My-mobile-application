import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Tool Rental Rwanda. All rights reserved.
    </footer>
  );
};
