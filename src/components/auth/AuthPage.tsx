'use client';

import React from 'react';
import LoginForm from './LoginForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-theme-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 flex justify-center">
          {/* <img src="/main_logo.png" className='h-[50px]' /> */}
        </div>

        {/* Login Form Only */}
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
