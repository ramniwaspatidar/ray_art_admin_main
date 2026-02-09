'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/utils/auth';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const AuthWrapper = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // router.replace('/');

      // const checkAuth = () => {
      //   if (!isAuthenticated()) {
      //     logout();
      //     router.replace('/');
      //     return false;
      //   }
      //   return true;
      // };

      // if (!checkAuth()) {
      //   return;
      // }
      setLoading(false);

    }, [router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
}
