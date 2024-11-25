// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'duvdshhrz',
//   api_key: '784524479772363',
//   api_secret: 'wVfzkP0KX1wSKdkP2sT2kY13SHs'
// });

// export default cloudinary;

// For React, you do not need to use the cloudinary SDK like on the backend
// Instead, load the Cloudinary upload widget from a CDN

export const cloudinaryConfig = {
    cloudName: 'duvdshhrz', // Your Cloudinary cloud name
    uploadPreset: 'mri_scans', // Your upload preset
  };
  