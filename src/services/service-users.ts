import { secret, validUser } from '../models/user';

export const validateRequest = (userPassword: string) => {
  const [user, password] = userPassword.split(':');
  return user === validUser && password === secret;
};
