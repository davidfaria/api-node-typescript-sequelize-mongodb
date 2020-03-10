import { Request, Response, NextFunction } from 'express';

export default (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('permission', permission);

    return next();
  };
};
