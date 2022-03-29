import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';

//delete booking for user
export default async function deleteBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = await CabBooking.findById(req.params.id);

  if (!id) {
    return res.status(404).json({
      status: 'fail',
      message: 'booking id is not valid',
    });
  }
  console.log(req.body.user.id);
  const reqs = await CabBooking.findByIdAndDelete({
    createdBy: req.body.user.id,
    _id: req.params.id,
  });

  return res.status(200).json({
    message: 'success',
  });
}
