import { createToken } from '../../../utils/token';
import { Request, Response } from 'express';
import User from '../../../models/user';
import { authSchema } from '../../../helpers/validationSchema';
import Joi from 'joi';

export default async function Login(
  req: Request,
  res: Response
): Promise<Response | void> {
  const result = await authSchema.validateAsync({
    email: req.body.email,
    password: req.body.password,
  });

  //check if user exist
  const user = await User.findOne({ email: result.email });
  if (!user) {
    return res.status(404).end({
      status: 'fail',
      message: 'User not found please register',
    });
  }
  //check password is matching
  if (await user.isValidPassword(result.password)) {
    //assign new JWT token
    const accessToken = createToken(user._id);
    return res.status(200).json({
      status: 'success',
      accessToken,
    });
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'user credentials not matching',
    });
  }
}
