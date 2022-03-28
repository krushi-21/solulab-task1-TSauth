import Joi from 'joi';

export const authSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
