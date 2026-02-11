'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import toast from 'react-hot-toast';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || 'Admin created successfully');
        handleReset();
        onClose();
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Failed to add admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setNewAdmin({
      name: '',
      email: '',
      password: '',
      role: 'admin',
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Admin"
      className="max-w-2xl"
    >
      <form onSubmit={handleAddAdmin} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter full name"
            value={newAdmin.name}
            onChange={(val) => setNewAdmin({ ...newAdmin, name: val })}
            required
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. admin@example.com"
            value={newAdmin.email}
            onChange={(val) => setNewAdmin({ ...newAdmin, email: val })}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter secure password"
            value={newAdmin.password}
            onChange={(val) => setNewAdmin({ ...newAdmin, password: val })}
            required
          />

          <Dropdown
            label="Role"
            name="role"
            options={roles}
            value={newAdmin.role}
            onChange={(val) => setNewAdmin({ ...newAdmin, role: val })}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-theme-border">
          <button
            type="button"
            onClick={handleClose}
            className="btn-outline px-6 py-2 rounded-lg text-sm font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary px-6 py-2 rounded-lg text-sm font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Add Admin'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAdminModal;
