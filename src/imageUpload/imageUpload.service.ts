import { v2 as cloudinary } from 'cloudinary';

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
export const uploadImage = async (imagePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};
