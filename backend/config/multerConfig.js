import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'authors', // Puoi cambiare il nome della cartella se necessario
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

export default upload;
