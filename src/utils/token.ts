import jwt from 'jsonwebtoken';

//creating JWT token for user
export const createToken = (id: string): string => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
  } catch (error) {}
  return null;
};
