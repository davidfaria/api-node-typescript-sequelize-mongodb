import { Router } from 'express';

/**
 * Controllers
 */
import RoleController from '@controllers/RoleController';

/**
 *  Middlewares
 */
import { Acl } from '@middlewares/acl';

const routes = Router();

routes.get(
  '/roles',
  [
    Acl({
      roles: ['administrador'],
    }),
  ],
  RoleController.index,
);

export default routes;
