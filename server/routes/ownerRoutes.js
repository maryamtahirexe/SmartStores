// import express from 'express';
// import { auth } from '../middleware/auth.js';
// import {
//   createOwner,
//   getOwners,
//   deleteOwner,
//   updateOwner,
//   getOwnersByStoreId
// } from '../controllers/ownerController.js';

// const router = express.Router();

// router.post('/', auth, createOwner);
// router.get('/', getOwners);
// router.delete('/:id', auth, deleteOwner);
// router.patch('/:id', auth, updateOwner);
// router.get('/:id', getOwnersByStoreId);

// export default router;


import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createOwner,
  getOwners,
  deleteOwner,
  updateOwner,
  getOwnersByStoreId,
  loginOwner // Assuming you'll add login functionality for owners
} from '../controllers/ownerController.js';

const router = express.Router();

// Route to create a new owner
// Public access (no auth middleware)
router.post('/create', createOwner);

// Route for owner login
// Public access (no auth middleware)
router.post('/login', loginOwner);

// Route to fetch all owners
// Requires authentication
router.get('/', auth, getOwners);

// Route to delete an owner by ID
// Requires authentication
router.delete('/:id', auth, deleteOwner);

// Route to update an owner by ID
// Requires authentication
router.patch('/:id', auth, updateOwner);

// Route to fetch owners by store ID
// Requires authentication
router.get('/store/:id', auth, getOwnersByStoreId);

export default router;
