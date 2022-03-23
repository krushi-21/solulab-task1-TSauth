import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

//user schema setup
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'please tell us your email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'please tell us your password'],
    },
    passwordResetToken: String,
    passwordResetExpiresIn: Date,
  },

  { timestamps: true }
);

//function will run before saving data and encrypt user password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//this function will compare hashed and normal password
UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

//this function will create reset token for password
UserSchema.methods.createPasswordResetToken = async function () {
  //generating new reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //reset password expire time
  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
  //returing password reset token
  return resetToken;
};

export default model('User', UserSchema);
