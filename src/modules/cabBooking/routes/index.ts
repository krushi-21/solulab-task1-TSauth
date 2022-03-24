import { Router } from 'express';
import createBooking from '../controllers/createBooking';
import deleteBooking from '../controllers/deleteBooking';
import checkPastBooking from '../controllers/pastBooking';
//configure express router
const router = Router();

//adding all routes
router.post('/createBooking', createBooking);
router.delete('/deleteBooking', deleteBooking);
router.get('/pastBooking/:id', checkPastBooking);

export const cabBookingRouter = router;
