'use client';

import React, { useState } from 'react';
import { toastService } from '@/lib/toast';
import {
  capitalizeWord,
  USER_MANAGEMENT_PAGE,
  BUTTONS,
  TABLE_HEADERS,
} from '@/utils/constant';
import Pagination from '@/components/ui/Pagination';
import LoadingState from '@/components/ui/LoadingState';
import { getCookieAuthToken, getUserRole } from '@/utils/auth';
import AddAdminModal from '@/components/user-management/AddAdminModal';
import Modal from '@/components/ui/Modal';

const UserManagementPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<any>(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    hasMore: false,
    totalItems: 0,
    maxPageReached: 1
  });

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      const roleParam = selectedRole !== 'all' ? `&role=${selectedRole.toLowerCase()}` : '';
      const searchParam = searchTerm ? `&search=${searchTerm}` : '';
      
      const token = getCookieAuthToken();
      
      const response = await fetch(
        `http://localhost:3001/api/admin?page=${page}&limit=${pagination.itemsPerPage}${roleParam}${searchParam}`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const result = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
        const { pagination: apiPagination } = result;
        setPagination(prev => ({
          ...prev,
          currentPage: apiPagination.currentPage,
          hasMore: apiPagination.hasMore,
          totalItems: apiPagination.total,
          maxPageReached: Math.max(prev.maxPageReached, apiPagination.currentPage)
        }));
      } else {
        toastService.error(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toastService.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers(1);
  }, [selectedRole]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handleDeleteConfirmed = async () => {
    if (!adminToDelete) return;

    try {
      setIsDeleting(true);
      const token = getCookieAuthToken();
      const response = await fetch(`http://localhost:3001/api/admin/${adminToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();

      if (result.success) {
        toastService.success(result.message || 'Admin deleted successfully');
        setIsDeleteModalOpen(false);
        setAdminToDelete(null);
        fetchUsers(pagination.currentPage);
      } else {
        toastService.error(result.message || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toastService.error('Failed to delete admin');
    } finally {
      setIsDeleting(false);
    }
  };

  const adminRoles = ['ADMIN', 'MODERATOR'];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 p-4 border-b bg-theme-background border-theme-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-theme-foreground">{USER_MANAGEMENT_PAGE.TITLE}</h1>
            <p className="text-sm text-muted-foreground">{USER_MANAGEMENT_PAGE.DESCRIPTION}</p>
          </div>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm border border-theme-border focus:outline-none focus:ring-1 focus:ring-theme-primary bg-theme-background text-theme-foreground min-w-[250px]"
              />
              <button type="submit" className="hidden">Search</button>
            </form>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border border-theme-border focus:outline-none focus:ring-1 focus:ring-theme-primary bg-theme-background text-theme-foreground min-w-[120px]"
            >
              <option value="all">All Roles</option>
              {adminRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <button 
               onClick={() => setIsAddAdminModalOpen(true)}
               className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add User
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-4 min-h-0">
        {loading ? (
          <LoadingState />
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-hidden bg-theme-background border border-theme-border rounded-xl shadow-lg">
              <div className="h-full overflow-auto">
                <table className="w-full min-w-max">
                  <thead className="table-header border-b border-theme-border sticky top-0 bg-theme-background z-10">
                    <tr>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Email
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Role
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Joined Date
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {TABLE_HEADERS.ACTIONS}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                          No admins found
                        </td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr 
                          key={user.id || index}
                          className={`table-row-hover transition-colors duration-200 ${
                            index % 2 === 0 ? 'bg-theme-background' : 'bg-theme-muted/20'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-foreground">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            <span className={`inline-flex items-center rounded-full text-xs px-2.5 py-0.5 font-medium ${
                              user.role.toUpperCase() === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                              user.role.toUpperCase() === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                             <div className="flex gap-2">
                               {/* <button className="text-theme-primary hover:text-theme-primary/80">{BUTTONS.EDIT}</button> */}
                               <button 
                                 onClick={() => {
                                   setAdminToDelete(user);
                                   setIsDeleteModalOpen(true);
                                 }}
                                 className="text-red-600 hover:text-red-800"
                               >
                                 {BUTTONS.DELETE}
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Component */}
            {!loading && users.length > 0 && (
              <div className="flex-shrink-0 mt-4">
                <Pagination
                  currentPage={pagination.currentPage}
                  maxPageReached={pagination.maxPageReached}
                  onPageChange={handlePageChange}
                  canGoNext={pagination.hasMore}
                  canGoPrev={pagination.currentPage > 1}
                  itemsOnCurrentPage={users.length}
                  itemsPerPage={pagination.itemsPerPage}
                  hasMore={pagination.hasMore}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        onSuccess={() => fetchUsers(1)}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteModalOpen(false);
            setAdminToDelete(null);
          }
        }}
        title="Confirm Deletion"
        className="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-theme-foreground">
            Are you sure you want to delete <span className="font-semibold">{adminToDelete?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setAdminToDelete(null);
              }}
              className="px-4 py-2 text-sm font-medium text-theme-foreground bg-theme-muted/20 hover:bg-theme-muted/30 rounded-lg transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirmed}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementPage;

