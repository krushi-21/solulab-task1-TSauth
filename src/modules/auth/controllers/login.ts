import { createToken } from '../../../utils/token';
import { Request, Response } from 'express';
import User from '../../../models/user';

export default async function Login(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).end('User not found please register');
      return;
    }
    //check password is matching
    if (await user.isValidPassword(password)) {
      //assign new JWT token
      const accessToken = createToken(user._id);
      res.status(200).send(accessToken);
      return;
    } else {
      res.status(400).send('user credentials not matching');
      return;
    }
  } catch (error) {
    res.status(400).send('unable to login user' + error);
    return;
  }
}
