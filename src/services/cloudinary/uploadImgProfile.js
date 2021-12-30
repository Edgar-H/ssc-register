import axios from 'axios';
import { baseUrlCloudinary } from './cloudinaryConfig';

export const uploadImgProfile = async (imgProfile) => {
  const formData = new FormData();
  formData.append('file', imgProfile);
  formData.append('upload_preset', 'ssc_register_test');

  const { data } = await axios.post(baseUrlCloudinary, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.secure_url;
};
