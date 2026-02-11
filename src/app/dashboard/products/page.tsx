'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '@/components/ui/Pagination';
import LoadingState from '@/components/ui/LoadingState';
import AddProductModal from '@/components/products/AddProductModal';
import Modal from '@/components/ui/Modal';
import { withAuth } from '@/hooks/useAuth';
import { PRODUCTS_PAGE, BUTTONS, TABLE_HEADERS } from '@/utils/constant';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  imageUrl: string | null;
  category: string;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    hasMore: false,
    totalItems: 0,
    maxPageReached: 1
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirmed = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || 'Product deleted successfully');
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts(pagination.currentPage);
      } else {
        toast.error(result.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&limit=${pagination.itemsPerPage}`);
      const result = await response.json();

      if (result.success && result.data) {
        setProducts(result.data);
        const { pagination: apiPagination } = result;
        setPagination(prev => ({
          ...prev,
          currentPage: apiPagination.currentPage,
          hasMore: apiPagination.hasMore,
          totalItems: apiPagination.total,
          maxPageReached: Math.max(prev.maxPageReached, apiPagination.currentPage)
        }));
      } else {
        toast.error(result.message || PRODUCTS_PAGE.FETCH_FAILED);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(PRODUCTS_PAGE.FETCH_FAILED);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 p-4 border-b bg-theme-background border-theme-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-theme-foreground">{PRODUCTS_PAGE.TITLE}</h1>
            <p className="text-sm text-muted-foreground">{PRODUCTS_PAGE.DESCRIPTION}</p>
          </div>
          <button 
             onClick={() => setIsAddModalOpen(true)}
             className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
          >
            Add Product
          </button>
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
                        {PRODUCTS_PAGE.NAME}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {PRODUCTS_PAGE.CATEGORY}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Sub Category
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {PRODUCTS_PAGE.PRICE}
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Description
                      </th>
                      <th className="table-header-text px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        {TABLE_HEADERS.ACTIONS}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                          {PRODUCTS_PAGE.NO_PRODUCTS_TITLE}
                        </td>
                      </tr>
                    ) : (
                      products.map((product, index) => (
                        <tr 
                          key={product.id || index}
                          className={`table-row-hover transition-colors duration-200 ${
                            index % 2 === 0 ? 'bg-theme-background' : 'bg-theme-muted/20'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-foreground">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            {product.subCategory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-foreground">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-theme-foreground max-w-xs truncate">
                            {product.description || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsAddModalOpen(true);
                                }}
                                className="text-theme-primary hover:text-theme-primary/80"
                              >
                                {BUTTONS.EDIT}
                              </button>
                              <button 
                                onClick={() => {
                                  setProductToDelete(product);
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

            {!loading && products.length > 0 && (
              <div className="flex-shrink-0 mt-4">
                <Pagination
                  currentPage={pagination.currentPage}
                  maxPageReached={pagination.maxPageReached}
                  onPageChange={handlePageChange}
                  canGoNext={pagination.hasMore}
                  canGoPrev={pagination.currentPage > 1}
                  itemsOnCurrentPage={products.length}
                  itemsPerPage={pagination.itemsPerPage}
                  hasMore={pagination.hasMore}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        onSuccess={() => fetchProducts(pagination.currentPage)}
        product={editingProduct}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
          }
        }}
        title="Confirm Deletion"
        className="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-theme-foreground">
            Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
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

export default withAuth(ProductsPage);
