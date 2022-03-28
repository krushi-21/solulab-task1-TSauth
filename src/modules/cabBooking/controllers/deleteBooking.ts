import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';

//delete booking for user
export default async function deleteBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { userId, bookingId } = req.body;
  const id = await CabBooking.findOne({ _id: bookingId });
  if (!id) {
    res.status(404).end('booking id is not valid');
    return;
  }
  const reqs = await CabBooking.findByIdAndDelete({
    createdBy: userId,
    _id: bookingId,
  });

  res.status(200).send('success');

  res.status(404).send('unable to delete current booking');
  console.log('unable to delete current booking');
}
