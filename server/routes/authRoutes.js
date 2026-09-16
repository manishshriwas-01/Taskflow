import express from 'express';
import { login, register } from '../controller/authController.js';
import { loginValidator, registerValidator } from '../validators/authValidator.js';

import { validate } from '../middleware/validate.js';

const router=express.Router();

router.post('/register',
    registerValidator,
    validate,
    register
);

router.post('/login',
    loginValidator,
    validate,
    login
)
export default router;