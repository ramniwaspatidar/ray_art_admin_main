import { API_ENDPOINTS } from '@/utils/constant';

export interface UploadResult {
  url: string;
  filename: string;
}

export async function uploadFile(
  file: File,
  filename: string,
  category: string
): Promise<{ url: string }> {
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.ADMIN_UPLOAD_FILE}`;

  const formData = new FormData();
  // Using 'file' key as expected by Multer in the backend
  formData.append('file', file);
  // Using 'filename' and 'category' keys as defined in UploadFileDto
  formData.append('filename', filename);
  formData.append('category', category);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Upload failed (${response.status}): ${text || response.statusText}`
    );
  }

  const result = await response.json();

  // Based on the backend code, it returns an object with a 'url' property.
  // We handle both direct returns and wrapped { success: true, data: { url: ... } } returns.
  const imageUrl = result.url || result.data?.url;

  if (!imageUrl) {
    throw new Error('Image URL not found in the upload response');
  }

  return { url: imageUrl };
}

export async function uploadVideoFile(
  file: File,
  folderName: string
): Promise<{ url: string }> {
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/upload/files`;
  if (!endpoint) {
    throw new Error(
      'Video uploads are not enabled. Set NEXT_PUBLIC_VIDEO_UPLOAD_URL to an endpoint that accepts video/mp4 or video/webm.'
    );
  }

  const formData = new FormData();
  formData.append('files', file);
  formData.append('folderName', folderName);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Upload failed (${response.status}): ${text || response.statusText}`
    );
  }

  const data = await response.json();
  return { url: data.data[0].url };
}
