import { Request, Response, NextFunction } from 'express';
import StoreService from '@services/StoreService';

export default async (req: Request, res: Response, next: NextFunction) => {
  const store_id = req.headers.store_id;

  if (!store_id) return res.sendError('Store not provided', 401);

  try {
    const storeId = Number(store_id);

    const isAuthorized = await StoreService.checkPermissionStore(
      req.userId,
      storeId,
    );

    // console.log('isAuthorized', isAuthorized);

    if (!isAuthorized)
      return res.sendError(`Permissão negada para loja: ${storeId}`, 401);

    req.storeId = storeId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
