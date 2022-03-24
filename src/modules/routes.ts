import { Router } from 'express';
import { authRouter } from './auth/routes';
import { cabBookingRouter } from './cabBooking/routes';
import authMiddleware from '../middlewares/authMiddleware';
import getAllCabRequset from './cab/controllers/getAllReq';

const router = Router();

router.use('/auth', authRouter);
router.use('/cab', authMiddleware, cabBookingRouter);
router.use('/cabRequset', getAllCabRequset);

export const AppRoutes = router;
