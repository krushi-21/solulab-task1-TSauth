import { Request, Response } from 'express';
import Cab from '../../../models/Cab';

export default async function registerCab(req: Request, res: Response) {
  const registerCab = await Cab.create(req.body);
  if (!registerCab) {
    return res.status(404).json({
      status: 'fail',
      message: 'unable to register cab',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: registerCab,
  });
}
