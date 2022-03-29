import { Router } from 'express';

import registerCab from '../controllers/registerCab';
import { catchAsync } from '../../../utils/catchAsync';
import authMiddleware from '../../../middlewares/authMiddleware';
//configure express router
const router = Router();

//adding all routes

router.post('/registerCab', authMiddleware, catchAsync(registerCab));

export const cabOwnerRouter = router;
