import { Router } from 'express';

/**
 * Controllers
 */
import UserController from '@controllers/UserController';

/**
 *  Valitors
 */
import UserStoreValidator from '@validators/UserStore';
import UserUpdateValidator from '@validators/UserUpdate';

/**
 *  Middlewares
 */
import { Acl } from '@middlewares/acl';

const routes = Router();

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

export default routes;
