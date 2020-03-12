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
    // const { name, password, avatar_id } = req.body;
    // const user = await User.findByPk(req.userId);

    // if (!user) return res.status(400).json({ error: 'User not found' });

    // user.name = name;
    // user.password = password;
    // user.avatar_id = avatar_id;
    // await user.save();

    // return res.json({
    //   id: user.id,
    //   name,
    //   email: user.email,
    // });
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: 'true' });
  }
}

export default new UserController();
