import { Request, Response } from 'express';
import { Op } from 'sequelize';
// import Queue from '@lib/Queue';
import Mail from '@schemas/Mail';
import User from '@models/User';
// import ForgetPasswordMail from '@jobs/ForgetPasswordMail';
import { generateBcryptHash, randomHash } from '@helpers/hash';
import { generateJwtToken } from '@helpers/jwt';

class ForgetlController {
  async store(req: Request, res: Response) {
    const { email } = req.body;

    const forget = randomHash();

    const user = await User.findOne({
      where: {
        email,
        status: {
          [Op.ne]: 'canceled',
        },
      },
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    user.forget = forget;
    user.forgetAt = new Date();
    await user.save();

    const link = `${process.env.APP_URL_FRONTEND}/forgetPassword/${forget}`;

    // console.log('dataMail', { name: user.name, email, link });

    // Queue.add(ForgetPasswordMail.key, {
    //   dataMail: { name: user.name, email, link },
    // });

    Mail.create({
      flag: 'ForgetPasswordMail',
      from: process.env.MAIL_FROM,
      to: email,
      subject: '[LARAWORK] - Alteração de Senha',
    });

    return res.send();
  }

  async update(req: Request, res: Response) {
    const { forget, password } = req.body;

    // console.log('password', password);

    const user = await User.findOne({ where: { forget } });

    if (!user) return res.status(400).json({ error: 'Token forget invalid' });

    user.forget = null;
    user.forgetAt = null;
    user.password = password;
    await user.save();

    const { id, name, email } = user;
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

export default new ForgetlController();
