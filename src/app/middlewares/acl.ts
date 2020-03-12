import { Request, Response, NextFunction } from 'express';
import AclService from '@app/app/services/AclService';

const Can = (permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.userId;
    const authorized = await AclService.can(permissions, user_id);

    if (!authorized) return res.status(401).json({ error: 'Permissão negada' });
    return next();
  };
};

const Is = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.userId;
    const authorized = await AclService.is(roles, user_id);
    if (!authorized) return res.status(401).json({ error: 'Permissão negada' });

    return next();
  };
};

interface IAcl {
  permissions?: string[];
  roles?: string[];
}

const Acl = ({ roles = [], permissions = [] }: IAcl) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.userId;

    const roleAuthorized = await AclService.is(roles, user_id);
    if (roleAuthorized) return next();

    const permissionAuthorized = await AclService.can(permissions, user_id);
    if (permissionAuthorized) return next();

    return res.status(401).json({ error: 'Permissão negada' });
  };
};

export { Acl, Can, Is };
