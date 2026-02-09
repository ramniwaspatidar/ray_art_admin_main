'use client';

import React, { useState } from 'react';
import { toastService } from '@/lib/toast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/${FORGOT_PASSWORD}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-api-key': 'ksbQs4jsi3D3dsf8sgw6AAfsewfsdDhgu76tger5tygAA',
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //     }),
      //   }
      // );

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to send reset email');
      // }

      toastService.success('Password reset email sent successfully!');
      setIsSubmitted(true);

    } catch (error: any) {
      console.error('Forgot password error:', error);
      toastService.error(error.message || 'Failed to send reset email. Please try again.');
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-muted py-12 px-4 sm:px-6 lg:px-8">
        <Card variant="elevated" className="w-full max-w-md mx-auto">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-light mb-4">
              <svg className="h-6 w-6 text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-theme-foreground mb-2">
              Check Your Email
            </h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
           
            <div className="space-y-3">
              {/* <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
              >
                Try Again
              </Button> */}
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={handleBackToLogin}
              >
                Back to Login
              </Button>
            </div>
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
            Forgot Password?
          </h2>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
            error={errors.email}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPasswordPage;