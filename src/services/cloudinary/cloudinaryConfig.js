import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_APi_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

export const baseUrlCloudinary = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

// formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
// formData.append('timestamp', Date.now());
