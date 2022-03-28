import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';
import getDistanceInKilometer from '../../../utils/distance';
import Cab from '../../../models/Cab';
import mongoose from 'mongoose';

//function to book cab for user
export default async function createBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const pickupAddress = req.body.pickupAddress;
  const dropAddress = req.body.dropAddress;
  const userId = req.body.userId;

  const locationA = pickupAddress.coordinates.toString().split(',');
  const locationB = dropAddress.coordinates.toString().split(',');

  const dist = getDistanceInKilometer(
    locationA[0],
    locationA[1],
    locationB[0],
    locationB[1]
  );
  console.log(dist);
  const tripPrice = Math.ceil(15 * dist);
  const radius = 10 / 3963.2;

  const cabs: mongoose.Types.ObjectId = await Cab.find({
    booked: false,
    location: {
      $geoWithin: {
        $centerSphere: [[locationA[0], locationA[1]], radius],
      },
    },
  }).get('_id');
  console.log(cabs);
  const cabBook = await CabBooking.create({
    pickupAddress,
    dropAddress,
    tripPrice,
    bookingConfirm: true,
    createdBy: userId,
  });
  res.status(200).send(cabBook);
}
