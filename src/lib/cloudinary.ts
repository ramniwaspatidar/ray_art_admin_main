import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string = 'products'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload failed: No result returned'));
        resolve(result as CloudinaryUploadResult);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export default cloudinary;
