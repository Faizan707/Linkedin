import multer from "multer";

export const uploadFile = (fileType) => {
  const storage = multer.memoryStorage();

  const fileTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  };

  const fileFilter = (req, file, cb) => {
    if (fileTypes[fileType]?.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, 
  });
};

export default uploadFile;
