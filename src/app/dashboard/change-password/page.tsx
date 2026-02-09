'use client';

import React, { useState, useCallback } from 'react';
import { toastService } from '@/lib/toast';
import { CHANGE_PASSWORD_PAGE } from '@/utils/constant';
import { withAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getCookieAuthToken } from '@/utils/auth';
import Card from '@/components/ui/Card';

const ChangePasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = CHANGE_PASSWORD_PAGE.CURRENT_PASSWORD_REQUIRED;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = CHANGE_PASSWORD_PAGE.NEW_PASSWORD_REQUIRED;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = CHANGE_PASSWORD_PAGE.PASSWORD_MIN_LENGTH;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.newPassword)) {
      newErrors.newPassword = CHANGE_PASSWORD_PAGE.PASSWORD_COMPLEXITY;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = CHANGE_PASSWORD_PAGE.CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = CHANGE_PASSWORD_PAGE.PASSWORDS_DO_NOT_MATCH;
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = CHANGE_PASSWORD_PAGE.NEW_PASSWORD_DIFFERENT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const authToken = getCookieAuthToken();
      
      if (!authToken) {
        toastService.error(CHANGE_PASSWORD_PAGE.AUTH_REQUIRED);
        return;
      }

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/${CHANGE_PASSWORD}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${authToken}`,
      //       'x-api-key': 'ksbQs4jsi3D3dsf8sgw6AAfsewfsdDhgu76tger5tygAA',
      //     },
      //     body: JSON.stringify({
      //       currentPassword: formData.currentPassword,
      //       newPassword: formData.newPassword,
      //     }),
      //   }
      // );

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to change password');
      // }

      toastService.success(CHANGE_PASSWORD_PAGE.PASSWORD_CHANGED_SUCCESS);
      
      setErrors({});

    } catch (error: any) {
      console.error('Change password error:', error);
      toastService.error(error.message || CHANGE_PASSWORD_PAGE.CHANGE_PASSWORD_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-theme-foreground mb-2">{CHANGE_PASSWORD_PAGE.TITLE}</h1>
          <p className="text-muted-foreground">{CHANGE_PASSWORD_PAGE.DESCRIPTION}</p>
        </div>

        <Card variant="elevated" className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label={CHANGE_PASSWORD_PAGE.CURRENT_PASSWORD_LABEL}
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(value) => handleInputChange('currentPassword', value)}
              placeholder={CHANGE_PASSWORD_PAGE.CURRENT_PASSWORD_PLACEHOLDER}
              required
              error={errors.currentPassword}
            />

            <Input
              label={CHANGE_PASSWORD_PAGE.NEW_PASSWORD_LABEL}
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(value) => handleInputChange('newPassword', value)}
              placeholder={CHANGE_PASSWORD_PAGE.NEW_PASSWORD_PLACEHOLDER}
              required
              error={errors.newPassword}
            />

            <Input
              label={CHANGE_PASSWORD_PAGE.CONFIRM_PASSWORD_LABEL}
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              placeholder={CHANGE_PASSWORD_PAGE.CONFIRM_PASSWORD_PLACEHOLDER}
              required
              error={errors.confirmPassword}
            />


            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                disabled={isLoading}
                onClick={handleButtonClick}
                className="flex-1"
              >
                {isLoading ? CHANGE_PASSWORD_PAGE.CHANGING : CHANGE_PASSWORD_PAGE.CHANGE_PASSWORD_BUTTON}
              </Button>
              
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

const ProtectedChangePasswordPage = withAuth(ChangePasswordPage);

export default ProtectedChangePasswordPage;