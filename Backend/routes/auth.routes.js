import express from 'express'
import { login, logout, signUp, verfiyEmail, forgotPassword, resetPassword } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAuth } from '../controller/auth.controller.js';

const router = express.Router();
router.get('/check-auth', verifyToken, checkAuth)
router.post('/signup', signUp);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verfiyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);
export default router
