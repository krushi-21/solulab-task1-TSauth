import { Request, Response, NextFunction } from 'express';
import User from '../../../models/user';
import { createToken } from '../../../utils/token';

export default async function Register(
  req: Request,
  res: Response
): Promise<Response | void> {
  //get user data
  const { email, password, role } = req.body;
  //check user is already exist or not
  const user = await User.findOne({ email });
  if (user) {
    res.status(404).end('User already register with this email');
    return;
  }

  //save user in Database
  const newUser = await User.create({
    email,
    password,
    role,
  });
  //send error if user is not created
  if (!newUser) res.status(404).send('Something went wrong please try again');

  //generate new token for user
  const accessToken = createToken(newUser._id);
  res.status(200).send(accessToken);
  return;
}
