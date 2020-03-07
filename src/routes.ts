import { Router } from 'express';
import multer from 'multer';

/**
 *  Config
 */
import multerConfig from '@config/multer';

/**
 *  Middleware
 */
import authMiddleware from '@middlewares/auth';

/**
 * Controller
 */
import SessionController from '@controllers/SessionController';
import RegisterController from '@controllers/RegisterController';
import ConfirmEmailController from '@controllers/ConfirmEmailController';
import ForgetController from '@controllers/ForgetController';
import UserController from '@controllers/UserController';
import FileController from '@controllers/FileController';

/**
 * Validator
 */
import SessionValidator from '@validators/Session';
import RegisterValidator from '@validators/Register';
import ForgetValidator from '@validators/Forget';
import ForgetResetPasswordValidator from '@validators/ForgetResetPassword';
import UserStoreValidator from '@validators/UserStore';
import UserUpdateValidator from '@validators/UserUpdate';

/**
 *  Setup Config
 */
const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.post('/sessions', SessionValidator, SessionController.store);
routes.post('/sessions', SessionValidator, SessionController.store);
routes.post('/register', RegisterValidator, RegisterController.store);
routes.post('/confirmEmail', ConfirmEmailController.store);

routes.post('/forget', ForgetValidator, ForgetController.store);
routes.put(
  '/forgetResetPassword',
  ForgetResetPasswordValidator,
  ForgetController.update
);

routes.get('/users', UserController.index);
routes.post('/users', UserStoreValidator, UserController.store);
routes.put('/users/:id', UserUpdateValidator, UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
