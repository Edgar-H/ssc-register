const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

export const baseUrlCloudinary = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

// formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
// formData.append('timestamp', Date.now());
