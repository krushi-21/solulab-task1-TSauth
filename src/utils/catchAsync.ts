import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export function catchAsync(fn: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      if (err.isJoi) {
        return res.status(400).json({
          status: 'fail',
          message: err.message,
        });
      }

      return res
        .status(500)
        .send({ message: 'Internal Server Error.', data: [] });
    }
  };
}
