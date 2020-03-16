import { Router } from 'express';

/**
 *  Middleware
 */
import authMiddleware from '@middlewares/auth';
import storeMiddleware from '@middlewares/store';

/**
 * Routes
 */
import authRoutes from '@routes/auth';
import usersRoutes from '@routes/users';
import categoriesRoutes from '@routes/categories';
import productsRoutes from '@routes/products';
import customersRoutes from '@routes/customers';

// Administrador
import rolesRoutes from '@routes/roles';

/**
 *  Setup Config
 */
const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.use(authRoutes);

/**
 *  privates Routes [jwt, acl]
 */
routes.use([authMiddleware, storeMiddleware]);
routes.use(usersRoutes);
routes.use(categoriesRoutes);
routes.use(productsRoutes);
routes.use(customersRoutes);

/**
 * Admin routes
 */
routes.use(rolesRoutes);

export default routes;
