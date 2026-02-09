'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import { PRODUCTS_PAGE, PRODUCT_CATEGORIES, PRODUCT_SUB_CATEGORIES } from '@/utils/constant';
import toast from 'react-hot-toast';
import { uploadImageAction } from '@/app/actions/upload';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    imageUrl: '',
    category: '',
    subCategory: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      let imageUrl = newProduct.imageUrl;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('category', newProduct.category);
        
        const uploadResult = await uploadImageAction(formData);
        
        if (uploadResult.success && uploadResult.url && uploadResult.publicId) {
          // Initialize Cloudinary instance for URL generation
          const cld = new Cloudinary({
            cloud: {
              cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || 'dxdglyi74'
            }
          });

          const myImage = cld.image(uploadResult.publicId);
          
          // myImage
          //   .resize(
          //     fill()
          //       .width(433)
          //       .aspectRatio(0.5)
          //       .gravity(autoGravity())
          //   )
          //   .delivery(quality(auto()))
          //   .delivery(format(auto()));

          imageUrl = myImage.toURL();

          toast.success('Image uploaded successfully');
        } else {
          throw new Error(uploadResult.message || 'Image upload failed');
        }
      }

      // Convert prices to numbers as required by the backend
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        originalPrice: parseFloat(newProduct.originalPrice) || 0,
        imageUrl,
      };

      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || 'Product added successfully');
        handleClose();
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      imageUrl: '',
      category: '',
      subCategory: '',
    });
    setSelectedFile(null);
    setImagePreview(null);
    onClose();
  };

  const subCategoryOptions = newProduct.category 
    ? (PRODUCT_SUB_CATEGORIES[newProduct.category as keyof typeof PRODUCT_SUB_CATEGORIES] || [])
    : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Product"
      className="max-w-6xl"
    >
      <form onSubmit={handleAddProduct} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <label className="text-sm font-medium text-theme-foreground mb-4 w-full">Product Image</label>
            <div className="relative w-full aspect-square border-2 border-dashed border-theme-border rounded-xl overflow-hidden flex items-center justify-center bg-theme-muted/10 group hover:border-theme-primary transition-colors cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <svg className="mx-auto h-12 w-12 text-neutral-400 group-hover:text-theme-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="mt-2 text-sm text-neutral-500">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {imagePreview && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white text-sm font-medium">Change Image</p>
                </div>
              )}
            </div>
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
          </div>
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
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
