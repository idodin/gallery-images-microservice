import multer from 'multer';
import { storageEngine as GCPStorageEngine } from 'multer-google-storage';
import {imageFilter} from "./filter";

const uploadHandler = multer({
    storage: GCPStorageEngine(),
    fileFilter: imageFilter
    });

export { uploadHandler }