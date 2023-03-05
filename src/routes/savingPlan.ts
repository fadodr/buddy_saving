import { Router } from 'express';
import { createSavingPlan, inviteUsers, resolveInvite } from '../controllers';
import {
  createSavingPlanSchema,
  initeUserSchema,
  resolveInviteSchema,
} from '../validations';

import { controllerHandler } from '../helpers';

const router = Router();

router.post(
  '/create',
  controllerHandler(createSavingPlan, createSavingPlanSchema)
);
router.get('/invite', controllerHandler(inviteUsers, initeUserSchema));
router.get('/resolve', controllerHandler(resolveInvite, resolveInviteSchema));

export default router;
