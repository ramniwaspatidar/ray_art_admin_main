'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout, isAuthenticated } from '@/utils/auth';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems: any = [
    // { href: '/dashboard', label: 'Dashboard' },
    // { href: '/about', label: 'About' },
    // { href: '/application', label: 'Apply Now' },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    router.replace('/');
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [pathname]);

  return (
    <nav className="bg-theme-background shadow-sm border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
            <img src="/main_logo.png" className='h-[30px]' />
              {/* <span className="text-2xl font-bold text-theme-primary">
                The Foundery
              </span> */}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-theme-primary bg-theme-secondary'
                      : 'text-theme-foreground hover-text-primary hover-bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* <ThemeSwitcher /> */}
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="btn-error p-2 rounded-md flex items-center justify-center"
                aria-label="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {loggedIn && (

              <button
                onClick={handleLogout}
                className="btn-error p-2 rounded-md flex items-center justify-center"
                aria-label="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12"
                  />
                </svg>
              </button>
            )}
            {/* <ThemeSwitcher /> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-theme-foreground hover-bg-muted focus-ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-theme-background border-t border-theme-border">
            {navItems.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-theme-primary bg-theme-secondary'
                    : 'text-theme-foreground hover-text-primary hover-bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
