import { Router } from 'express';

/**
 * Controllers
 */
import CategoryController from '@controllers/CategoryController';

/**
 *  Valitors
 */
import CategoryValidator from '@validators/Category';

/**
 *  Middlewares
 */
import { Acl } from '@middlewares/acl';

const routes = Router();

routes.get(
  '/categories',
  [
    Acl({
      permissions: ['categories_list'],
    }),
  ],
  CategoryController.index,
);

routes.post(
  '/categories',
  [
    Acl({
      permissions: ['categories_create'],
    }),
    CategoryValidator,
  ],
  CategoryController.store,
);

routes.put(
  '/categories/:id',
  [
    Acl({
      permissions: ['categories_update'],
    }),
    CategoryValidator,
  ],
  CategoryController.update,
);

routes.delete(
  '/categories/:id',
  [
    Acl({
      permissions: ['categories_delete'],
    }),
  ],
  CategoryController.delete,
);

export default routes;
