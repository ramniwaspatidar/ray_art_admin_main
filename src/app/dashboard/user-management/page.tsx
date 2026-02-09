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

const UserManagementPage = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isSetPermissionsModalOpen, setIsSetPermissionsModalOpen] =
    useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToUpdate, setUserToUpdate] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [users, setUser] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    hasMore: false,
    offset: undefined as string | undefined,
    maxPageReached: 1
  });
  
  // Cache for storing page data to avoid unnecessary API calls
  const [pageCache, setPageCache] = useState<Map<number, {
    data: any[];
    hasMore: boolean;
    offset?: string;
  }>>(new Map());

  const [isLoading, setIsLoading] = useState(false);

  const adminRoles = ['SUPER_ADMIN', 'ADMIN', 'INTERVIEWER'];

  React.useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleSetPermissions = (user: any) => {
    setSelectedUser(user);
    setIsSetPermissionsModalOpen(true);
  };

  const handleSavePermissions = async (permissions: any[]) => {
    try {
      const authToken = getCookieAuthToken();

      if (!authToken || !selectedUser) {
        throw new Error('Authentication required or no user selected');
      }

      // API to save permissions

      toastService.success(USER_MANAGEMENT_PAGE.PERMISSIONS_UPDATED_SUCCESS);
      // Clear cache and refresh from page 1
      setPageCache(new Map());
      await fetchUsers(1, true);
    } catch (error) {
      console.error('Error updating permissions:', error);
      toastService.error(USER_MANAGEMENT_PAGE.PERMISSIONS_UPDATE_FAILED);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleAddUser = async (userData: {
    fullName: string;
    email: string;
    role: string;
  }) => {
    try {
      const authToken = getCookieAuthToken();

      // await userService.createUser({ ...userData, authToken: authToken || '' });
      setPageCache(new Map());
      await fetchUsers(1, true);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    } finally {
      handleCloseModal();
    }
  };

  const handleUpdateUser = async (userData: { role: string }) => {
    try {
      const authToken = getCookieAuthToken();

      if (!authToken || !userToUpdate) {
        throw new Error('Authentication required or no user selected');
      }

      // await userService.updateUserRole(
      //   authToken,
      //   userToUpdate.id,
      //   userData.role
      // );
      setPageCache(new Map());
      await fetchUsers(1, true);
      setIsUpdateUserModalOpen(false);
      setUserToUpdate(null);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const handleEditClick = (user: any) => {
    setUserToUpdate(user);
    setIsUpdateUserModalOpen(true);
  };

  const fetchUsers = async (page: number = 1, forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      
      if (!forceRefresh && pageCache.has(page)) {
        const cachedData = pageCache.get(page)!;
        setUser(cachedData.data);
        
        setPagination(prev => ({
          ...prev,
          currentPage: page,
          hasMore: cachedData.hasMore,
          offset: cachedData.offset,
          maxPageReached: Math.max(prev.maxPageReached, page)
        }));
        
        setIsLoading(false);
        return;
      }
      
      const authToken = getCookieAuthToken();
      
      let offset: string | undefined;
      
      if (page === 1) {
        offset = undefined;
      } else {
        const prevPageData = pageCache.get(page - 1);
        offset = prevPageData?.offset || pagination.offset;
      }
      
      // const response = await userService.getUsers(
      //   authToken || '',
      //   page,
      //   pagination.itemsPerPage,
      //   offset
      // );
      
      // const userData = response.data || [];
      // const hasMore = response.pagination?.hasMore || false;
      // const nextOffset = response.pagination?.offset;
      
      // setPageCache(prev => {
      //   const newCache = new Map(prev);
      //   newCache.set(page, {
      //     data: userData,
      //     hasMore: hasMore,
      //     offset: nextOffset
      //   });
      //   return newCache;
      // });
      
      // setUser(userData);
      
      // setPagination(prev => ({
      //   ...prev,
      //   currentPage: page,
      //   hasMore: hasMore,
      //   offset: nextOffset,
      //   maxPageReached: Math.max(prev.maxPageReached, page)
      // }));
      
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteAdmin = async (userId: string) => {
    try {
      const authToken = getCookieAuthToken();

      if (!authToken) {
        toastService.error(USER_MANAGEMENT_PAGE.AUTH_REQUIRED);
        return;
      }

      // const response = await userService.deleteAdmin(authToken, userId);

      // if (response.success) {
      //   toastService.success(USER_MANAGEMENT_PAGE.ADMIN_DELETED_SUCCESS);
      //   setPageCache(new Map());
      //   await fetchUsers(1, true);
      // }
    } catch (error: any) {
      console.error('Delete admin error:', error);
      toastService.error(
        error.message || USER_MANAGEMENT_PAGE.DELETE_ADMIN_FAILED
      );
      throw error;
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 p-3 lg:p-4 border-b bg-theme-background border-theme-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg lg:text-xl font-bold text-theme-foreground truncate">
              {USER_MANAGEMENT_PAGE.TITLE}
            </h1>
            <p className="text-xs text-muted-foreground">
              {USER_MANAGEMENT_PAGE.DESCRIPTION}
            </p>
          </div>
          
          {/* Compact Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            {getUserRole().toUpperCase() !== 'INTERVIEWER' && (
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="btn-secondary px-3 py-1.5 rounded-md text-sm h-10"
              >
                {USER_MANAGEMENT_PAGE.ADD_USER}
              </button>
            )}
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 rounded-md text-sm min-w-[120px] h-10 border border-theme-border focus:outline-none focus:ring-1 focus:ring-theme-primary/20 focus:border-theme-primary bg-theme-background text-theme-foreground"
            >
              <option value="all">All Roles</option>
              {adminRoles.map((role) => {
                return (
                  <option key={role} value={role}>
                    {capitalizeWord(role.replace('_', ' '))}
                  </option>
                );
              })}
            </select>
            
            <button
              onClick={() => {
                setPageCache(new Map());
                fetchUsers(1, true);
              }}
              disabled={isLoading}
              className="btn-outline px-3 py-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm h-10"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-4 min-h-0">

        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-hidden bg-theme-background border border-theme-border rounded-xl shadow-lg">
              <div className="h-full overflow-auto">
                <table className="w-full min-w-max">
                  <thead className="sticky top-0 z-10 table-header border-b border-theme-border">
                    <tr className="text-left text-xs font-semibold uppercase table-header-text tracking-wider">
                      <th className="px-3 py-3 whitespace-nowrap">
                        {USER_MANAGEMENT_PAGE.USER}
                      </th>
                      <th className="px-3 py-3 whitespace-nowrap">
                        {USER_MANAGEMENT_PAGE.ROLE}
                      </th>
                      <th className="px-3 py-3 whitespace-nowrap">
                        {USER_MANAGEMENT_PAGE.STATUS}
                      </th>
                      {/* <th className="px-3 py-3 whitespace-nowrap">
                        {USER_MANAGEMENT_PAGE.PERMISSIONS}
                      </th> */}
                      <th className="px-3 py-3 whitespace-nowrap">
                        {TABLE_HEADERS.ACTIONS}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {users.map((user, index) => {
                    
                      const roleColors = {
                        'Super Admin': 'badge-info',
                        'HR Manager': 'badge-neutral',
                        Interviewer: 'badge-warning',
                        Viewer: 'badge-neutral',
                      };
                      const statusColors = {
                        active: 'badge-success',
                        pending: 'badge-warning',
                        inactive: 'badge-error',
                      };

                      return (
                        <tr key={user.id} className={`transition-colors table-row-hover ${
                          index % 2 ? 'bg-theme-muted/30' : 'bg-theme-background'
                        }`}>
                          <td className="px-3 py-3">
                            <div className="flex items-center">
                              <div
                                className={`h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-medium text-sm`}
                              >
                                {/* {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')} */}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-theme-foreground truncate max-w-[120px]" title={user.name}>
                                  {user.name}
                                </div>
                                <div className="text-sm text-neutral-500 truncate max-w-[120px]" title={user.email}>
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex items-center rounded-full text-xs px-2 py-1 ${
                                roleColors[user.role as keyof typeof roleColors]
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex items-center rounded-full text-xs px-2 py-1 ${
                                statusColors[
                                  (typeof user.isActive === 'boolean'
                                    ? (user.isActive ? 'active' : 'inactive')
                                    : user.isActive) as keyof typeof statusColors
                                ]
                              }`}
                            >
                              {typeof user.isActive === 'boolean'
                                ? (user.isActive ? 'Active' : 'Inactive')
                                : (typeof user.isActive === 'string'
                                    ? user.isActive.charAt(0).toUpperCase() + user.isActive.slice(1)
                                    : 'Unknown')}
                            </span>
                          </td>

                          {/* <td className="px-3 py-3">
                            <button
                              onClick={() => handleSetPermissions(user)}
                              disabled={getUserRole().toUpperCase() === 'INTERVIEWER'}
                              className={`text-xs font-medium ${
                                getUserRole().toUpperCase() === 'INTERVIEWER'
                                  ? DISABLED_STYLES.BASE + ' text-neutral-300'
                                  : 'text-neutral-600 hover-text-neutral-900'
                              }`}
                            >
                              {USER_MANAGEMENT_PAGE.SET_PERMISSIONS}
                            </button>
                          </td> */}
                          <td className="px-3 py-3 text-xs font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClick(user)}
                                disabled={getUserRole().toUpperCase() === 'INTERVIEWER'}
                                className={'text-neutral-600 hover-text-neutral-900 cursor-pointer'
                                }
                              >
                                {BUTTONS.EDIT}
                              </button>
                              <button
                                onClick={() => handleDeleteClick(user)}
                                disabled={getUserRole().toUpperCase() === 'INTERVIEWER'}
                                className={'text-error hover-text-error cursor-pointer'
                                }
                              >
                                {BUTTONS.DELETE}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Component */}
            {!isLoading && (
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

     
    </div>
  );
};

export default UserManagementPage;

