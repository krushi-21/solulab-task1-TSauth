import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let token;

  const authHeader = req.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(404).send('unauthorized');
    }
    const user = await verifyToken(token);
    if (!user) {
      res.status(404).send('unauthenticated');
    }
  }

  return next();
}
