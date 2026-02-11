'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { withAuth } from '@/hooks/useAuth';
import { CONTACT_US_PAGE, TABLE_HEADERS, LABELS, getDateFormat } from '@/utils/constant';
import LoadingState from '@/components/ui/LoadingState';
import toast from 'react-hot-toast';
import { getCookieAuthToken } from '@/utils/auth';

interface ContactUsInterface {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  file?: string;
  createdAt: string;
}

const ContactUsPage: React.FC = () => {
  const [contactEntries, setContactEntries] = useState<ContactUsInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    hasMore: false,
    offset: undefined as string | undefined,
    maxPageReached: 1
  });

  const fetchContacts = async (page: number = 1) => {
    try {
      setLoading(true);
      const token = getCookieAuthToken();
      const searchParam = searchQuery ? `&search=${searchQuery}` : '';
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-us?page=${page}&limit=${pagination.itemsPerPage}${searchParam}`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const result = await response.json();

      if (result.success && result.data) {
        setContactEntries(result.data);
        const { pagination: apiPagination } = result;
        setPagination(prev => ({
          ...prev,
          currentPage: apiPagination.currentPage,
          hasMore: apiPagination.hasMore,
          totalItems: apiPagination.total,
          maxPageReached: Math.max(prev.maxPageReached, apiPagination.currentPage)
        }));
      } else {
        toast.error(result.message || 'Failed to fetch contact requests');
      }
    } catch (error) {
      console.error('Error fetching contact requests:', error);
      toast.error('Failed to fetch contact requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchContacts(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchContacts(1);
  };

  const handleViewDetails = (contact: ContactUsInterface) => {

  };



  const handleSendReply = (contact: ContactUsInterface) => {
  
  };

 
  const truncateMessage = (message: string, maxLength: number = 25) => {
    if (!message) return '';
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 p-3 lg:p-4 border-b bg-theme-background border-theme-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg lg:text-xl font-bold text-theme-foreground truncate">
              {CONTACT_US_PAGE.TITLE}
            </h1>
            <p className="text-xs text-muted-foreground">
              {CONTACT_US_PAGE.DESCRIPTION}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Search by name, email, or topic..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-3 py-1.5 border border-theme-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-theme-primary/20 focus:border-theme-primary bg-theme-background text-theme-foreground text-sm w-48"
            />
            
            <Button onClick={handleSearch} variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>
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
                  <thead className="table-header border-b border-theme-border">
                    <tr>
                    
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {CONTACT_US_PAGE.NAME}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {CONTACT_US_PAGE.EMAIL}
                      </th>
                     
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {TABLE_HEADERS.CREATED}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {TABLE_HEADERS.MESSAGE}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {TABLE_HEADERS.ACTIONS}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-theme-background divide-y divide-neutral-100">
                    {contactEntries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-neutral-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-neutral-900 mb-2">
                              {CONTACT_US_PAGE.NO_CONTACTS_TITLE}
                            </h3>
                            <p className="text-neutral-500">
                              {CONTACT_US_PAGE.NO_CONTACTS_MESSAGE}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      contactEntries.map((entry, index) => {
                        const fullName = entry.name.trim();
                        return (
                          <tr
                            key={`${entry.id}-${index}`}
                            className={`table-row-hover transition-colors duration-200 ${
                              index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-theme-muted rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-neutral-600">
                                    {(fullName || 'C')
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-theme-foreground">
                                {fullName || LABELS.NOT_AVAILABLE}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-theme-foreground">
                                {entry.email || LABELS.NOT_AVAILABLE}
                              </div>
                            </td>
                       

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                              <div className="flex flex-col">
                                <span>{getDateFormat(entry.createdAt || '')}</span>
                              </div>
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                               <div className="max-w-md">
                                 <span>{truncateMessage(entry.message || '')}</span>
                               </div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                               <div className="flex gap-2">
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   onClick={() => handleViewDetails(entry)}
                                   className="shadow-sm hover:shadow-md transition-shadow duration-200"
                                 >
                                   <svg
                                     className="w-4 h-4 mr-1"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24"
                                   >
                                     <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                     />
                                     <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                     />
                                   </svg>
                                   {CONTACT_US_PAGE.VIEW_DETAILS}
                                 </Button>
                               </div>
                             </td>
                           </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {!loading && contactEntries.length > 0 && (
              <div className="flex-shrink-0 mt-4">
                <Pagination
                  currentPage={pagination.currentPage}
                  maxPageReached={pagination.maxPageReached}
                  onPageChange={handlePageChange}
                  canGoNext={pagination.hasMore}
                  canGoPrev={pagination.currentPage > 1}
                  itemsOnCurrentPage={contactEntries.length}
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

const ProtectedContactUsPage = withAuth(ContactUsPage);

export default ProtectedContactUsPage;