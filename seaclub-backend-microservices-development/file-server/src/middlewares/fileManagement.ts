import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3Client } from '../config/s3Client';

export function multerInstance(path = "/", fileSize = 100) { // size in MB

  const storage = multerS3({
    s3: s3Client,
    bucket: process.env.SPACES_BUCKET_NAME || '',
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const dest = `${req.user._id}/${path}`;

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${dest}/${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
    }
  });

  return multer({
    storage,
    fileFilter: (req, file, cb) => { if (req.user._id) cb(null, true); else cb(null, false) },
    limits: { fileSize: (1024 ** 2) * fileSize } //convert to bytes
  });
}