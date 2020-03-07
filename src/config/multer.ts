import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const stotageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.originalname);

        // console.log('file', file);
        file.key = `${hash.toString('hex')}${extname(file.originalname)}`;

        return cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // bucket: `${process.env.AWS_BUCKET}/uploads`,
    bucket: `${process.env.AWS_BUCKET}`,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}${extname(file.originalname)}`;

        return cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: stotageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // console.log('file default:', file);

    const allowedMimes = [
      'image/jpeg',
      'iamge/pjpeg',
      'image/png',
      'image/gif',
      'text/csv',
      'application/pdf',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato invalido!'));
    }
  },
};
