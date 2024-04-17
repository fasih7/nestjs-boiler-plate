import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export const hashWithBcryptJS = async (password: string) => {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateRandomToken = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};
