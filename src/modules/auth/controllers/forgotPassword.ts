import { Request, Response } from 'express';

import User from '../../../models/user';

export default async function ForgotPassword(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    //get user email
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).end('User not found please register');
      return;
    }
    //create new reset password token
    const resetToken = user.createPasswordResetToken();
    //TODO: send token to user email
    console.log(resetToken);
    //save token in DB
    await user.save();
    res.status(200).send('reset token has sent to your email');
    return;
  } catch (err) {
    console.log(err);
  }
}
