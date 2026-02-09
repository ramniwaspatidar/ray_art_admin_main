'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout, isAuthenticated } from '@/utils/auth';

const Sidebar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = [

    {
      href: '/dashboard/user-management',
      label: 'User Management',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      href: '/dashboard/products',
      label: 'Products',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
   
    {
      href: '/dashboard/contact-us',
      label: 'Contact Us',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  
     {
      href: '/dashboard/change-password',
      label: 'Change Password',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    // logout();
    // setLoggedIn(false);
    // router.replace('/');
  };

  useEffect(() => {
    // setLoggedIn(isAuthenticated());
        setLoggedIn(true);

  }, [pathname]);

  return (
    <div className="w-64 bg-theme-background border-r border-theme-border h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-theme-border">
        <Link href="/dashboard" className="flex items-center">
          <img src="/main_logo.png" className="h-8" alt="The Foundery" />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 overflow-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-theme-primary text-theme-primary-foreground'
                    : 'text-theme-foreground hover-bg-muted hover-text-primary'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      {loggedIn && (
        <div className="p-4 border-t border-theme-border">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium btn-outline-error rounded-lg"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
