export type Clock = {
  id: string;
  start: Date;
  day: number;
  month: number;
  year: number;
  end: Date | null;
  duration: number | null;
}
