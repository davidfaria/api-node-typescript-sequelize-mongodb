import Mail from '@lib/Mail';
// import JobMail from '@jobs/JobMail';

class RegistrationMail {
  get key(): string {
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
