import express from 'express';
import { login, updateAdmin } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.patch('/update', auth ,updateAdmin);

export default router;

