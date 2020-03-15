import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';

const generateJwtToken = ({ ...data }: object) => {
  const token = jwt.sign({ ...data }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  return token;
};

const jwtVerify = async (token: string): Promise<any> => {
  const decoded = await promisify(jwt.verify)(token, authConfig.secret);
  return decoded;
};
export { generateJwtToken, jwtVerify };
