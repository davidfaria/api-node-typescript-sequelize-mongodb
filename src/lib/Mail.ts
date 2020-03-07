import nodemailer, { Transport } from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '@config/mail';

// interface IMailConfig {
//   host: string;
//   port: number;
//   secure: boolean;
//   auth: {
//     user: string;
//     pass: string;
//   };
//   default: {
//     from: string;
//   };
// }

class Mail {
  private transporter: Transport;
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      // secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'mails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    // console.log({
    //   ...mailConfig.default,
    //   ...message
    // });
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
