import { format } from 'date-fns';

export function convertSecondsToHMS(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  return format(date, 'HH:mm:ss');
}
