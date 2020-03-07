import { Request, Response } from 'express';
import RegisterService from '@services/RegisterService';

class RegisterController {
  async store(req: Request, res: Response) {
    const { name, email, password, link } = req.body;

    const user = await RegisterService.create({
      name,
      email,
      password,
      link,
    });
    return res.status(201).json(user);
  }
}

export default new RegisterController();
