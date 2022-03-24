import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';

//get all past booking for users

export default async function checkPastBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const page: number = (req.query.page as any) * 1 || 1;
  const limit: number = (req.query.limit as any) * 1 || 100;
  const skip = (page - 1) * limit;

  try {
    const userId = req.params.id;
    console.log(skip);
    console.log(limit);
    const reqs = await CabBooking.find({ createdBy: userId })
      .skip(skip)
      .limit(limit);
    res.json(reqs);
  } catch (error) {}

  //   function paginate(query: any): any {
  //     const page: number = (req.query.page as any) * 1 || 1;
  //     const limit: number = (req.query.limit as any) * 1 || 100;
  //     const skip = (page - 1) * limit;
  //     let queryy = query.skip(skip).limit(limit);
  //     return query;
  //   }
}
