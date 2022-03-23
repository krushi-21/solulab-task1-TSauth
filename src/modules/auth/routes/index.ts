import { Router } from 'express';

import Register from '../controllers/register';
import Login from '../controllers/login';
import ResetPassword, {
  ResetPasswordWithToken,
} from '../controllers/resetPassword';
import ForgotPassword from '../controllers/forgotPassword';

//configure express router
const router = Router();

//adding all routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/reset-password', ResetPassword);
//TODO:ADD EMAIL SUPPORT FOR RESET PASSWORD
router.post('/reset-password/:token', ResetPasswordWithToken);
router.post('/forgot-password', ForgotPassword);

export const authRouter = router;
