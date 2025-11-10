import express from 'express';
import { createVaultEntry, getVaultEntries } from '../controllers/vaultController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createVaultEntry);
router.get('/', getVaultEntries);

export default router;
