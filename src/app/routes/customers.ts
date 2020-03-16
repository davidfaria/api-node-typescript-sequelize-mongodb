import { Router } from 'express';

/**
 * Controllers
 */
import CustomerController from '@controllers/CustomerController';

/**
 *  Valitors
 */
import CustomerValidator from '@validators/Customer';

/**
 *  Middlewares
 */
import { Acl } from '@middlewares/acl';

const routes = Router();

routes.get(
  '/customers',
  [
    Acl({
      permissions: ['customers_list'],
    }),
  ],
  CustomerController.index,
);

routes.post(
  '/customers',
  [
    Acl({
      permissions: ['customers_create'],
    }),
    CustomerValidator,
  ],
  CustomerController.store,
);

routes.put(
  '/customers/:id',
  [
    Acl({
      permissions: ['customers_update'],
    }),
    CustomerValidator,
  ],
  CustomerController.update,
);

routes.delete(
  '/customers/:id',
  [
    Acl({
      permissions: ['customers_delete'],
    }),
  ],
  CustomerController.delete,
);

export default routes;
