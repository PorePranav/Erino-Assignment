import { Router } from 'express';
import { login, signup, protect, getMe } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
