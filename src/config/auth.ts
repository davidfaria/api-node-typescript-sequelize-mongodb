const secret: string = <any>process.env.APP_SECRET;
export default {
  secret,
  expiresIn: '7d',
};
