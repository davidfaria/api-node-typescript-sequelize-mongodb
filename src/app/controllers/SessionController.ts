import { Request, Response } from 'express';

import User from '@models/User';
import File from '@models/File';
import { compareBcryptHash, generateBcryptHash } from '@helpers/hash';
import { generateJwtToken } from '@helpers/jwt';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    // console.log(user.password);
    const passwordMatch = await compareBcryptHash(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: generateJwtToken({ id }),
    });
  }
}

export default new SessionController();
