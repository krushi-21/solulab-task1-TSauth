import { Router } from 'express';
import { authRouter } from './auth/routes';
import { cabBookingRouter } from './cabBooking/routes';

import { cabOwnerRouter } from './cab/routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/cab', cabBookingRouter);
router.use('/cabRequset', cabOwnerRouter);

export const AppRoutes = router;
