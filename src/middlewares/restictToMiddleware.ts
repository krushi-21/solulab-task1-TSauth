import { NextFunction, Request, Response } from 'express';

export default async function restrictTo(
  roles: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.body;
  if (!roles.includes(user.role)) {
    return res.status(403).json({
      status: 'fail',
      statusCode: 403,
      message: 'You dont have permission',
    });
  }
  return next();
}
