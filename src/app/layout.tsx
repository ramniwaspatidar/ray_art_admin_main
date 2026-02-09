import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ErrorBoundary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Foundery',
  description:
    'A comprehensive Application Tracking System designed to streamline your hiring process',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <ErrorBoundary>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
