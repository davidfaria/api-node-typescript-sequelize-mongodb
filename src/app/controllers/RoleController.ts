import { Request, Response } from 'express';
import Role from '@models/Role';
import Permission from '@models/Permission';

class RoleController {
  async index(req: Request, res: Response) {
    const roles = await Role.findAll({
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] },
          attributes: ['id', 'slug'],
        },
      ],
    });
    return res.json(roles);
  }
}

export default new RoleController();
