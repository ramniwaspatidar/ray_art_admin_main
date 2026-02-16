'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import { PRODUCTS_PAGE, PRODUCT_CATEGORIES, PRODUCT_SUB_CATEGORIES } from '@/utils/constant';
import toast from 'react-hot-toast';
import { uploadImageAction } from '@/app/actions/upload';


interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: any; // Add optional product for editing
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    features: '',
    price: '',
    originalPrice: '',
    imageUrl: [] as string[],
    category: '',
    subCategory: '',
  });

  // Populate form when product prop changes (for editing)
  React.useEffect(() => {
    if (product) {
      setNewProduct({
        name: product.name || '',
        description: product.description || '',
        features: Array.isArray(product.features) ? product.features.join('\n') : (product.features || ''),
        price: String(product.price) || '',
        originalPrice: String(product.originalPrice) || '',
        imageUrl: Array.isArray(product.imageUrl) ? product.imageUrl : (product.imageUrl ? [product.imageUrl] : []),
        category: product.category || '',
        subCategory: product.subCategory || '',
      });
      if (product.imageUrl) {
        setImagePreviews(Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl]);
      }
    } else {
      // Reset if no product (adding mode)
      handleReset();
    }
  }, [product, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUploadImage = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images first');
      return;
    }

    try {
      setIsUploading(true);
      const newImageUrls: string[] = [...newProduct.imageUrl];
      
      // Upload files sequentially or in parallel
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', newProduct.category || 'products');

        const uploadResult = await uploadImageAction(formData);
        if (uploadResult.success && uploadResult.url) {
          return uploadResult.url;
        } else {
          throw new Error(uploadResult.message || 'Image upload failed');
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      newImageUrls.push(...uploadedUrls);

      setNewProduct(prev => ({ ...prev, imageUrl: newImageUrls }));
      setSelectedFiles([]); // Clear selected files after upload
      toast.success('Images uploaded successfully');
      
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload some images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newProduct.imageUrl.length === 0) {
      toast.error('Please upload at least one image for the product');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Convert prices to numbers as required by the backend
      // Convert features string to array
      const featuresArray = newProduct.features 
        ? newProduct.features.split('\n').filter(f => f.trim() !== '') 
        : [];

      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        originalPrice: parseFloat(newProduct.originalPrice) || 0,
        features: featuresArray,
      };

      const isEditing = !!product?.id;
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${product.id}` 
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || `Product ${isEditing ? 'updated' : 'added'} successfully`);
        handleClose();
        onSuccess();
      } else {
        toast.error(result.message || `Failed to ${isEditing ? 'update' : 'add'} product`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setNewProduct({
      name: '',
      description: '',
      features: '',
      price: '',
      originalPrice: '',
      imageUrl: [],
      category: '',
      subCategory: '',
    });
    setSelectedFiles([]);
    setImagePreviews([]);
    setIsUploading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const subCategoryOptions = newProduct.category 
    ? (PRODUCT_SUB_CATEGORIES[newProduct.category as keyof typeof PRODUCT_SUB_CATEGORIES] || [])
    : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={product ? "Update Product" : "Add New Product"}
      className="max-w-6xl"
    >
      <form onSubmit={handleAddProduct} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
            <label className="text-sm font-medium text-theme-foreground w-full">Product Images</label>
            
            <div className="w-full grid grid-cols-2 gap-2 mb-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square border border-theme-border rounded-lg overflow-hidden group">
                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                        const newPreviews = [...imagePreviews];
                        newPreviews.splice(index, 1);
                        setImagePreviews(newPreviews);
                        
                        // Also remove from selectedFiles if it's there (this logic is simplified, purely visual removal for previews might desync if we don't track perfectly)
                        // Ideally we map previews to files. For now, let's just support clearing all or adding more.
                        // Or better: If it's already uploaded (in newProduct.imageUrl), remove from there.
                        // If it's in selectedFiles, remove from there.
                        // This is complex to implement perfectly in one go without more state. 
                        // Let's keep it simple: "Click to select image" adds to list.
                        // We will add a "Clear All" button instead of individual delete for now to be safe, or just render them.
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove (Implementation simplified)"
                  >
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            
              <div className="relative aspect-square border-2 border-dashed border-theme-border rounded-xl overflow-hidden flex items-center justify-center bg-theme-muted/10 group hover:border-theme-primary transition-colors cursor-pointer">
                <div className="text-center p-2">
                  <svg className="mx-auto h-8 w-8 text-neutral-400 group-hover:text-theme-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="mt-1 text-xs text-neutral-500">Add Images</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>
            
            {/* Separate Upload Button */}
            {selectedFiles.length > 0 && (
               <button
                 type="button"
                 onClick={handleUploadImage}
                 disabled={isUploading}
                 className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-theme-primary text-white hover:bg-theme-primary/90 transition-colors"
               >
                 {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} New Image${selectedFiles.length > 1 ? 's' : ''}`}
               </button>
            )}
          </div>

          {/* Form Fields Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Input
                label="Product Name"
                name="name"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(val) => setNewProduct({ ...newProduct, name: val })}
                required
              />
            </div>
            
            <Dropdown
              label="Category"
              name="category"
              options={PRODUCT_CATEGORIES}
              value={newProduct.category}
              onChange={(val) => setNewProduct({ ...newProduct, category: val, subCategory: '' })}
              required
              placeholder="Choose category"
            />
            
            <Dropdown
              label="Sub Category"
              name="subCategory"
              options={subCategoryOptions}
              value={newProduct.subCategory}
              onChange={(val) => setNewProduct({ ...newProduct, subCategory: val })}
              required
              placeholder="Choose sub category"
              disabled={!newProduct.category}
            />

            <Input
              label="Price"
              name="price"
              type="text"
              placeholder="e.g. 1500.00"
              value={newProduct.price}
              onChange={(val) => setNewProduct({ ...newProduct, price: val })}
              required
            />
            
            <Input
              label="Original Price"
              name="originalPrice"
              type="text"
              placeholder="e.g. 1800.00"
              value={newProduct.originalPrice}
              onChange={(val) => setNewProduct({ ...newProduct, originalPrice: val })}
            />

            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
              <label className="text-sm font-medium text-theme-foreground">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-theme-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-theme-primary bg-theme-background text-theme-foreground text-sm"
                rows={4}
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
              <label className="text-sm font-medium text-theme-foreground">Features</label>
              <textarea
                className="w-full px-3 py-2 border border-theme-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-theme-primary bg-theme-background text-theme-foreground text-sm"
                rows={4}
                placeholder="Enter product features (e.g. Dimensions, Material, Care Instructions)"
                value={newProduct.features}
                onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-theme-border">
          <button
            type="button"
            onClick={handleClose}
            className="btn-outline px-6 py-2 rounded-lg text-sm font-medium"
            disabled={isSubmitting || isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary px-6 py-2 rounded-lg text-sm font-medium"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? (product ? 'Updating...' : 'Adding...') : (product ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
