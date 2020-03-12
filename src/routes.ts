import { Router } from 'express';
// import multer from 'multer';

/**
 *  Config
 */
// import multerConfig from '@config/multer';

/**
 *  Middleware
 */
import authMiddleware from '@middlewares/auth';
import { Acl } from '@middlewares/acl';

/**
 * Controller
 */
import SessionController from '@controllers/SessionController';
import RegisterController from '@controllers/RegisterController';
import ConfirmEmailController from '@controllers/ConfirmEmailController';
import ForgetController from '@controllers/ForgetController';
import UserController from '@controllers/UserController';
import FileController from '@controllers/FileController';

import RoleController from '@controllers/RoleController';

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
// const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.post('/sessions', SessionValidator, SessionController.store);
routes.post('/register', RegisterValidator, RegisterController.store);
routes.post('/confirmEmail', ConfirmEmailController.store);

routes.post('/forget', ForgetValidator, ForgetController.store);
routes.put(
  '/forgetResetPassword',
  ForgetResetPasswordValidator,
  ForgetController.update,
);

routes.use(authMiddleware);

// routes.get('/users', Is('administrador'), UserController.index);
// routes.get('/users', Can(['users_list']), UserController.index);

routes.get(
  '/users',
  Acl({
    permissions: ['users_list'],
  }),
  UserController.index,
);

routes.post(
  '/users',
  Acl({
    permissions: ['users_create'],
  }),
  UserStoreValidator,
  UserController.store,
);

routes.put(
  '/users/:id([0-9]+)',
  Acl({
    permissions: ['users_update'],
  }),
  UserUpdateValidator,
  UserController.update,
);

routes.delete(
  '/users/:id([0-9]+)',
  Acl({
    permissions: ['users_delete'],
  }),
  UserController.destroy,
);

routes.get('/roles', RoleController.index);

// routes.post('/files', upload.single('file'), FileController.store);

export default routes;
