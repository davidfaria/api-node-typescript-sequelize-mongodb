import Queue from '@lib/Queue';
import RegistrationMail from '@jobs/RegistrationMail';
import Mail from '@schemas/Mail';
import User from '@models/User';

interface IRegister {
  name: string;
  email: string;
  password: string;
  link: string;
}

class RegisterService {
  async create({ name, email, password, link }: IRegister) {
    let user;

    /** se já existir o usuário na base retorna o mesmo */

    user = await User.findOne({
      where: { email },
      attributes: ['id', 'name'],
    });

    if (user)
      return {
        exists: true,
        user,
      };

    /**
     *  Caso não exista o usuario na base continue o processo de criação
     */
    user = await User.create({
      name,
      email,
      password,
    });

    Queue.add(RegistrationMail.key, { dataMail: { name, email, link } });

    Mail.create({
      flag: 'RegistrationMail',
      from: process.env.MAIL_FROM,
      to: email,
      subject: '[LARAWORK] - Confirmação de cadastro',
    });

    return { exists: false, user: { name, email, link } };
  }
}

export default new RegisterService();
