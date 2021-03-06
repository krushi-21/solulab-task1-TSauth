import { Request, Response } from 'express';
import Cab from '../../../models/Cab';

export default async function getNearbyCab(
  req: Request,
  res: Response
): Promise<Response | void> {
  console.log(req.body);
  const { lat, long } = req.body;
  if (!lat || !long) {
    return res.status(400).json({
      status: 'fail',
      message: 'please provide latitude and longitude',
    });
  }

  //10miles
  const radius = 10 / 3963.2;

  const cabs = await Cab.find({
    booked: false,
    location: {
      $geoWithin: {
        $centerSphere: [[lat, long], radius],
      },
    },
  });

  if (cabs.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'no cabs available at your destination',
    });
  }
  return res.status(200).json({
    status: 'succes',
    data: cabs,
  });
}
