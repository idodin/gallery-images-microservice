import multer from 'multer';
import { storageEngine as GCPStorageEngine } from 'multer-google-storage';

const uploadHandler = multer({
    storage: GCPStorageEngine()
});

export { uploadHandler }