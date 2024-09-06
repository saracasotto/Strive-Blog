import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'authors',
    allowed_formats: ['jpg', 'jpeg' ,'png'],
  },
});

const upload = multer({ storage: storage });

export default upload;
