import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';

//function to book cab for user
export default async function createBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const bookcab = new CabBooking({
      pickupAddress: req.body.pickupAddress,
      dropAddress: req.body.dropAddress,
      createdBy: req.body.userId,
    });
    await bookcab.save();
    res.status(200).json(bookcab);
    return;
  } catch (error) {
    res.status(404).send('unable to create booking');
    console.log(error);
  }
}
