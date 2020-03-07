import { Request, Response } from 'express';

import User from '@models/User';

class ConfirmEmailController {
  async store(req: Request, res: Response) {
    const { hash } = req.body;

    const email = Buffer.from(hash, 'base64').toString('ascii');

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    user.status = 'confirmed';
    user.confirmedAt = new Date();

    const isUpdated = await user.save();

    return res.json({ updated: isUpdated ? true : false });
  }
}

export default new ConfirmEmailController();
