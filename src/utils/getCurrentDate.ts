import { subHours } from 'date-fns';

export function getCurrentDate() {
  return subHours(new Date(), 3);
}
