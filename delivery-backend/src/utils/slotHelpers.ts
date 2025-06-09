// utils/slotHelpers.ts

export const isWeekday = (date: Date): boolean => {
  const day = date.getDay();
  return day >= 1 && day <= 5;
};

export const isExternalAllowedDay = (date: Date): boolean => {
  const day = date.getDay();
  return day >= 2 && day <= 5;
};

export const isGreenSlot = (hour: number): boolean => {
  return (hour >= 13 && hour < 15) || (hour >= 20 && hour < 22);
};
