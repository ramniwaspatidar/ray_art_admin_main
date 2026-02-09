'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Hide sidebar and footer on authentication pages
  const hideLayout = pathname === '/' || pathname === '/forgot-password' || pathname === '/reset-password' || pathname.startsWith('/reset-password');

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-theme-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ConditionalLayout;