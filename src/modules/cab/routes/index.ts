import { Router } from 'express';
import getAllCabRequset from '../controllers/getAllReq';
import registerCab from '../controllers/registerCab';
import { catchAsync } from '../../../utils/catchAsync';
import authMiddleware from '../../../middlewares/authMiddleware';
//configure express router
const router = Router();

//adding all routes

router.get('/getAllCabRequest', authMiddleware, catchAsync(getAllCabRequset));
router.post('/registerCab', authMiddleware, catchAsync(registerCab));

export const cabOwnerRouter = router;
