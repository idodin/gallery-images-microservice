export const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
    } else if(file.size > 4000000){
        req.fileValidationError = 'Image files must be below 4MB!';
    }
    cb(null, true);
}