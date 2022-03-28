import { Request, Response } from 'express';
import Cab from '../../../models/Cab';

export default async function getNearbyCab(
  req: Request,
  res: Response
): Promise<Response | void> {
  console.log(req.body);
  const { lat, long } = req.body;
  if (!lat || !long) {
    res.status(404).send('please provide latitude and longitude');
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
    res.status(200).send('no cabs available at your destination');
    return;
  }
  res.status(200).json({
    message: 'succes',
    data: cabs,
  });
}
