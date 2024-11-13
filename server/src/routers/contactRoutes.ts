import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../controllers/contactController';
import { protect } from '../controllers/authController';

const router = Router();

router.use(protect);
router.post('/', createContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
