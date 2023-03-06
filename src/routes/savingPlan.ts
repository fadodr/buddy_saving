import { Router } from 'express';
import { createSavingPlan, inviteUsers, resolveInvite } from '../controllers';
import {
  createSavingPlanSchema,
  initeUserSchema,
  resolveInviteSchema,
} from '../validations';

import { controllerHandler } from '../helpers';
import { isAuth } from '../middlewares';

const router = Router();

router.post(
  '/create',
  isAuth,
  controllerHandler(createSavingPlan, createSavingPlanSchema)
);
router.get('/invite/:savingId', isAuth, controllerHandler(inviteUsers, initeUserSchema));
router.get(
  '/resolve/:token',
  isAuth,
  controllerHandler(resolveInvite, resolveInviteSchema)
);

export default router;
