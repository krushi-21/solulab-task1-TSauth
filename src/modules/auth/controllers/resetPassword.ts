import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../../../models/user';
import { createToken } from '../../../utils/token';

//TODO: CREATE RESET PASSWORD WITH MAIL

export default async function ResetPassword(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    //get user data
    const { email, password, newPassword } = req.body;
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).end('User not found please register');
      return;
    }
    //check given password is valid or not
    if (await user.isValidPassword(password)) {
      //change password with new given password
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).send('password updated');
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

//Reset password function for mail
//user can reset password using given link

export async function ResetPasswordWithToken(
  req: Request,
  res: Response
): Promise<Response | void> {
  //decrypt token from user
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //find user by given token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  });
  if (!user) {
    res.status(404).end('User not found please register');
    return;
  }
  //update the password
  user.password = req.body.newPassword;

  //deleting reset token and expire time
  user.passwordResetToken = undefined;
  user.passwordResetExpiresIn = undefined;
  await user.save();
  console.log('password updated');

  //login in user with JWT
  const accessToken = createToken(user._id);
  res.status(200).send(accessToken);
  return;
}
