'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { LOGIN_FORM } from '@/utils/constant';
import { setCookieAuthToken, setUserRole } from '@/utils/auth';
import { toastService } from '@/lib/toast';
import Card from '../ui/Card';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = LOGIN_FORM.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = LOGIN_FORM.EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = LOGIN_FORM.PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = LOGIN_FORM.PASSWORD_MIN_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/validate`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || LOGIN_FORM.LOGIN_FAILED);
      }

      if (data && data.success) {
        // Store user role if available
        if (data.data?.admin?.role) {
          setUserRole(data.data.admin.role);
        }

        // Use accessToken from the response
        const token = data.data?.accessToken;
        
        if (token) {
          setCookieAuthToken(token);
          toastService.success(data.message || LOGIN_FORM.LOGIN_SUCCESS || 'Login successful!');
          router.replace('/dashboard/products');
        } else {
          throw new Error(LOGIN_FORM.NO_TOKEN_RECEIVED);
        }
      } else {
        console.error(LOGIN_FORM.TOKEN_NOT_FOUND_LOG, data);
        throw new Error(LOGIN_FORM.NO_TOKEN_RECEIVED);
      }
    } catch (error: any) {
      console.error(LOGIN_FORM.LOGIN_ERROR_LOG, error);
      toastService.error(error.message || LOGIN_FORM.LOGIN_FAILED_RETRY);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-theme-foreground mb-2">
          {LOGIN_FORM.TITLE}
        </h2>
        <p className="text-muted-foreground">
          {LOGIN_FORM.DESCRIPTION}
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label={LOGIN_FORM.EMAIL_LABEL}
          name="email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder={LOGIN_FORM.EMAIL_PLACEHOLDER}
          required
          error={errors.email}
        />

        <Input
          label={LOGIN_FORM.PASSWORD_LABEL}
          name="password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          placeholder={LOGIN_FORM.PASSWORD_PLACEHOLDER}
          required
          error={errors.password}
        />

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? LOGIN_FORM.SIGNING_IN : LOGIN_FORM.SIGN_IN}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push('/forgot-password')}
            className="text-sm text-neutral-600 hover-text-neutral font-medium"
          >
            {LOGIN_FORM.FORGOT_PASSWORD}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <Card variant="elevated" className="w-full max-w-md mx-auto">
      {renderLoginForm()}
    </Card>
  );
};

export default LoginForm;
