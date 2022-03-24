import { Router } from 'express';
import getAllCabRequset from '../controllers/getAllReq';
//configure express router
const router = Router();

//adding all routes

router.get('/getAllCabRequest', getAllCabRequset);

export const cabOwnerRouter = router;
