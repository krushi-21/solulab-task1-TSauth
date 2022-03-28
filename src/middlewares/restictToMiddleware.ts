import { NextFunction, Request, Response } from 'express';

export default async function restrictTo(
  roles: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.body;
  if (!roles.includes(user.role)) {
    res.status(404).send('You dont have permission');
  }
  return next();
}
