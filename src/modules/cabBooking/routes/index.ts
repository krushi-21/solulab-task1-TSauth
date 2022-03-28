import { Router } from 'express';
import authMiddleware from 'middlewares/authMiddleware';
import createBooking from '../controllers/createBooking';
import deleteBooking from '../controllers/deleteBooking';
import getNearbyCab from '../controllers/getNearbyCab';
import checkPastBooking from '../controllers/pastBooking';
import { catchAsync } from 'utils/catchAsync';
//configure express router
const router = Router();

//adding all routes
router.post('/createBooking', catchAsync(createBooking));
router.delete('/deleteBooking', catchAsync(deleteBooking));
router.get(
  '/pastBooking/:id',
  catchAsync(authMiddleware),
  catchAsync(checkPastBooking)
);
router.get('/getNearbyCab', authMiddleware, catchAsync(getNearbyCab));

export const cabBookingRouter = router;
