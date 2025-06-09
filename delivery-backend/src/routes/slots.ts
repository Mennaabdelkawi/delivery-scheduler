import { Router } from 'express';
import { handleSlotRequest } from '../controllers/slotsController';

const router = Router();

router.post('/', handleSlotRequest);

export default router;
