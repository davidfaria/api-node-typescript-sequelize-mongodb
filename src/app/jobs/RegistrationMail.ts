import Mail from '@lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }: any) {
    const { dataMail } = data;

    await Mail.sendMail({
      to: `${dataMail.name} <${dataMail.email}>`,
      subject: '[LARAWORK] - Confirmação de cadastro',
      template: 'registration',
      context: {
        name: dataMail.name,
        link: dataMail.link,
      },
      text: 'Confirmação de cadastro',
    });
  }
}

export default new RegistrationMail();
