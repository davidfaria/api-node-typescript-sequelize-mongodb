import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';

const generateJwtToken = ({ ...data }: object) => {
  const token = jwt.sign({ ...data }, 'ASHDLKAKLHDLKAHDAHLDA', {
    expiresIn: authConfig.expiresIn,
  });
  // const token = jwt.sign({ ...data }, authConfig.secret, {
  //   expiresIn: authConfig.expiresIn,
  // });

  return token;
};

export { generateJwtToken };
