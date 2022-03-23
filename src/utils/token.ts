import jwt from 'jsonwebtoken';

//creating JWT token for user
export const createToken = (id: string): string => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1d',
  });
};

// export const verifyToken = (token: string): boolean => {
//   jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
//     if (err) return false;
//   });
//   return true;
// };
