import { Router } from 'express';
import multer from 'multer';

/**
 *  Config
 */
import multerConfig from '@config/multer';

/**
 * Controllers
 */
import FileController from '@controllers/FileController';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
