import { Router } from 'express';

/**
 * Controllers
 */
import ProductController from '@controllers/ProductController';

/**
 *  Valitors
 */
import ProductValidator from '@validators/Product';

/**
 *  Middlewares
 */
import { Acl } from '@middlewares/acl';

const routes = Router();

routes.get(
  '/products',
  [
    Acl({
      permissions: ['products_list'],
    }),
  ],
  ProductController.index,
);

routes.post(
  '/products',
  [
    Acl({
      permissions: ['products_create'],
    }),
    ProductValidator,
  ],
  ProductController.store,
);

routes.get(
  '/products/:id',
  [
    Acl({
      permissions: ['products_update'],
    }),
  ],
  ProductController.show,
);

routes.put(
  '/products/:id',
  [
    Acl({
      permissions: ['products_update'],
    }),
    ProductValidator,
  ],
  ProductController.update,
);

routes.delete(
  '/products/:id',
  [
    Acl({
      permissions: ['products_delete'],
    }),
  ],
  ProductController.delete,
);

export default routes;
