import { Request, Response } from 'express';
import User from '../../../models/user';

//update Me function to update user details
export default async function updateMe(
  req: Request,
  res: Response
): Promise<Response | void> {
  let updatedUser = {
    name: req.body.name,
    mobileNo: req.body.mobileNo,
  };
  //   try {
  //     const response = await User.update(
  //       { email: req.body.email },
  //       updatedUser
  //     ).exec();
  //     res.json(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
}
