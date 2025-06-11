import { Request, Response } from 'express';
import { getAvailableDeliverySlots } from '../services/deliveryScheduler';
import { DeliveryRequest } from '../models/types';


export const handleSlotRequest = (req: Request, res: Response): void => {
  const { cart, now }: DeliveryRequest = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    res.status(400).json({ error: 'Invalid or empty cart' });
    return;
  }

  if (!cart.every(p => ['in-stock', 'fresh-food', 'external'].includes(p.type))) {
    res.status(400).json({ error: 'Invalid product type in cart' });
    return;
  }

  try {
    const currentTime = now ? new Date(now) : new Date();
    const slots = getAvailableDeliverySlots(cart, currentTime);
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate delivery slots' });
  }
};
