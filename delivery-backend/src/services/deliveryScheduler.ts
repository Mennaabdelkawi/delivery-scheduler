import { Product, Slot } from '../models/types';

const isWeekday = (date: Date) => {
  const day = date.getDay();
  return day >= 1 && day <= 5;
};

const isExternalAllowedDay = (date: Date) => {
  const day = date.getDay();
  return day >= 2 && day <= 5;
};

const isGreenSlot = (hour: number): boolean => {
  return (hour >= 13 && hour < 15) || (hour >= 20 && hour < 22);
};

export const getAvailableDeliverySlots = (
  cart: Product[],
  now: Date = new Date()
): Slot[] => {
  const slots: Slot[] = [];
  const maxDaysAhead = 14;
  const currentTime = new Date(now);
  let earliestDayOffset = 0;

  for (const product of cart) {
    if (product.type === 'external') {
      earliestDayOffset = Math.max(earliestDayOffset, 3);
    } else if (product.type === 'fresh-food') {
      const cutoff = new Date(currentTime);
      cutoff.setHours(12, 0, 0, 0);
      if (currentTime > cutoff) earliestDayOffset = Math.max(earliestDayOffset, 1);
    } else if (product.type === 'in-stock') {
      const cutoff = new Date(currentTime);
      cutoff.setHours(18, 0, 0, 0);
      if (currentTime > cutoff) earliestDayOffset = Math.max(earliestDayOffset, 1);
    }
  }

  const startDate = new Date(currentTime);
  startDate.setDate(currentTime.getDate() + earliestDayOffset);

  let slotId = 1;

  for (let i = 0; i < maxDaysAhead; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    if (!isWeekday(date)) continue;
    if (cart.some(p => p.type === 'external') && !isExternalAllowedDay(date)) continue;

    for (let hour = 8; hour < 22; hour++) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, 0, 0, 0);
      if (slotTime < currentTime) continue;

      slots.push({
        id: slotId++,
        datetime: slotTime.toISOString(),
        isGreen: isGreenSlot(hour),
      });
    }
  }

  return slots.sort((a, b) => {
  const dateA = new Date(a.datetime);
  const dateB = new Date(b.datetime);

  const dayA = dateA.toDateString();
  const dayB = dateB.toDateString();

  if (dayA !== dayB) {
    return dateA.getTime() - dateB.getTime(); // earlier date first
  }

  // Same day — green slots first
  if (a.isGreen && !b.isGreen) return -1;
  if (!a.isGreen && b.isGreen) return 1;

  // Same green status — earlier time first
  return dateA.getTime() - dateB.getTime();
});

};
