'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toastService } from '@/lib/toast';
import { RESET_PASSWORD } from '@/utils/constant';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const ResetPasswordContent: React.FC = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toastService.error('Invalid or missing reset token');
      router.push('/');
    }
  }, [searchParams, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm() || !token) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${RESET_PASSWORD}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ksbQs4jsi3D3dsf8sgw6AAfsewfsdDhgu76tger5tygAA',
          },
          body: JSON.stringify({
            token: token,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toastService.success('Password reset successfully!');
      handleBackToLogin();
    } catch (error: any) {
      console.error('Reset password error:', error);
      toastService.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  const handleBackToLogin = () => {
    router.push('/');
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-muted py-12 px-4 sm:px-6 lg:px-8">
        <Card variant="elevated" className="w-full max-w-md mx-auto">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-error-light mb-4">
              <svg className="h-6 w-6 text-error-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-theme-foreground mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-muted-foreground mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleBackToLogin}
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-muted py-12 px-4 sm:px-6 lg:px-8">
      <Card variant="elevated" className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-theme-foreground mb-2">
            Reset Your Password
          </h2>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(value) => handleInputChange('newPassword', value)}
            placeholder="Enter your new password"
            required
            error={errors.newPassword}
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Confirm your new password"
            required
            error={errors.confirmPassword}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-sm text-neutral-600 hover-text-neutral font-medium"
            >
              Back to Login
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-theme-muted py-12 px-4 sm:px-6 lg:px-8">
        <Card variant="elevated" className="w-full max-w-md mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </Card>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;