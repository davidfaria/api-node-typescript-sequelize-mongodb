import base64 from 'base-64';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const randomHash = (length: number = 30): string => {
  return randomBytes(length).toString('hex');
};

const generateBcryptHash = async (
  password: string,
  length: number = 8
): Promise<string> => {
  return await bcrypt.hash(password, length);
};

const compareBcryptHash = async (
  password: string,
  passsword_hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passsword_hash);
};

const btoa = (value: string): string => {
  if (!value) return value;
  return base64.encode(value);
};

const atob = (value: string): string => {
  if (!value) return value;
  return base64.decode(value);
};

const uuid = (): string => {
  return uuidv4();
};

export { randomHash, generateBcryptHash, compareBcryptHash, btoa, atob, uuid };
