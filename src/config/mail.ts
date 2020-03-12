const host: string = <any>process.env.MAIL_HOST;
const port: string = <any>process.env.MAIL_PORT;
const secure: string = <any>process.env.MAIL_SECURE;
const user: string = <any>process.env.MAIL_USER;
const pass: string = <any>process.env.MAIL_PASS;
const from: string = <any>process.env.MAIL_FROM;

export default {
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
  default: {
    from,
  },
};
