import { Router } from 'express';
import { authRouter } from './auth/routes';
import { cabBookingRouter } from './cabBooking/routes';

import { cabOwnerRouter } from './cab/routes';

const router = Router();
/**
 * @openapi
 * /auth:
 *  get:
 *     tags:
 *     - auth
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.use('/auth', authRouter);
router.use('/cab', cabBookingRouter);
router.use('/cabRequset', cabOwnerRouter);

export const AppRoutes = router;
