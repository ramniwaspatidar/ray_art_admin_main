'use server';

import { uploadToCloudinary } from '@/lib/cloudinary';

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const category = formData.get('category') as string || 'uploads';
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using our utility
    const result = await uploadToCloudinary(buffer, category);

    return { 
      success: true, 
      url: result.secure_url,
      publicId: result.public_id 
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to upload image' 
    };
  }
}
