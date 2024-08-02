import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createOwner,
  getOwners,
  deleteOwner,
  updateOwner
} from '../controllers/ownerController.js';

const router = express.Router();

router.post('/', auth, createOwner);
router.get('/', getOwners);
router.delete('/:id', auth, deleteOwner);
router.patch('/:id', auth, updateOwner);

export default router;
