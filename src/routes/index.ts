import { Router } from 'express';
import userRoute from './user';
import savingPlanRoute from './savingPlan';

const router = Router();

router.use('/users', userRoute);
router.use('/saving-plans', savingPlanRoute);

export default router;