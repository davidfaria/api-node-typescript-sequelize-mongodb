import { generateJwtToken } from '@helpers/jwt';

class SessionService {
  /**
   * Como podemos retonar o objeto de sessão por vários locais do frontend
   * por ex: [UPDATE PROFILE, RESET PASSWORD e SESSION DEFAULT]
   * vamos centralizar o retorno nesse serviço para padronizar.
   *
   * @param {*} user
   */
  getUserSession(user) {
    const { id, name, email } = user;
    const userSession = {
      user: {
        id,
        name,
        email,
      },
      token: generateJwtToken({ id }),
    };

    return userSession;
  }
}

export default new SessionService();
