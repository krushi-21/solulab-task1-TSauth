import { Router } from 'express';
import getAllCabRequset from '../controllers/getAllReq';
import registerCab from '../controllers/registerCab';
import { catchAsync } from 'utils/catchAsync';
//configure express router
const router = Router();

//adding all routes

router.get('/getAllCabRequest', catchAsync(getAllCabRequset));
router.post('/registerCab', catchAsync(registerCab));

export const cabOwnerRouter = router;
