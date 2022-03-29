import { Request, Response } from 'express';
import Cab from '../../../models/Cab';

export default async function registerCab(req: Request, res: Response) {
  const { location } = req.body;
  const driver = req.body.user.id;

  const cab = await Cab.findOne({ driver });
  if (cab) {
    return res.status(404).json({
      status: 'fail',
      message: 'you already registered cab with this Id',
    });
  }
  const registerCab = new Cab({ location, driver: driver });

  await registerCab.save();
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
