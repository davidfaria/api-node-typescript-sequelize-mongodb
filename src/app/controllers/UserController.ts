import { Request, Response } from 'express';
import User from '@models/User';
import File from '@models/File';
import RegisterService from '@services/RegisterService';

class UserController {
  constructor() {}

  async index(req: Request, res: Response): Promise<Response> {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password, link } = req.body;

    const user = await RegisterService.create({
      name,
      email,
      password,
      link,
    });

    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: 'true' });
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: 'true' });
  }
}

export default new UserController();
