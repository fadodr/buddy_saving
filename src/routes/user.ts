import { Router } from 'express';
import { createAccount, login } from '../controllers';
import { createAccountSchema, loginSchema } from '../validations';
import { controllerHandler } from '../helpers';

const router = Router();

router.post('/signup', controllerHandler(createAccount, createAccountSchema));
router.post('/login', controllerHandler(login, loginSchema));

export default router;
