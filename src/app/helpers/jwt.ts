import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

const generateJwtToken = ({ ...data }: any):string => {
  const token = jwt.sign({ ...data }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  return token;
};

export { generateJwtToken };
