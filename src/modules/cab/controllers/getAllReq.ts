import { Request, Response } from 'express';
import CabBooking from '../../../models/Booking';

//cab owner can get all cab booking requests
export default async function getAllCabRequset(req: Request, res: Response) {
  const page: number = (req.query.page as any) * 1 || 1;
  const limit: number = (req.query.limit as any) * 1 || 100;
  const skip = (page - 1) * limit;
  try {
    const reqs = await CabBooking.find({}).skip(skip).limit(limit);
    res.json(reqs);
  } catch (error) {}
}
