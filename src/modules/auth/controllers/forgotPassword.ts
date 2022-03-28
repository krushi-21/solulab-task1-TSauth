import { Request, Response } from 'express';

import User from '../../../models/user';

export default async function ForgotPassword(
  req: Request,
  res: Response
): Promise<Response | void> {
  //get user email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      staus: 'fail',
      message: 'User not found please register',
    });
  }
  //create new reset password token
  const resetToken = user.createPasswordResetToken();
  //TODO: send token to user email
  console.log(resetToken);
  //save token in DB
  await user.save();
  return res.status(202).json({
    status: 'success',
    message: 'reset token has sent to your email',
  });
}
