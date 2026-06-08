export function padTime(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatTime(date: Date, showSecond = false): string {
  const h = padTime(date.getHours());
  const m = padTime(date.getMinutes());
  if (!showSecond) return `${h}:${m}`;
  return `${h}:${m}:${padTime(date.getSeconds())}`;
}

export function parseTimeString(value: string, showSecond = false): Date | null {
  const parts = value.split(":").map(Number);
  if (parts.some((p) => Number.isNaN(p))) return null;
  const [h, m, s = 0] = parts;
  if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) return null;
  if (!showSecond && parts.length > 2 && parts[2] !== 0) {
    /* allow HH:mm:ss parse when showSecond false */
  }
  const d = new Date();
  d.setHours(h, m, showSecond ? s : 0, 0);
  return d;
}

export function buildTime(h: number, m: number, s = 0): Date {
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d;
}

export function rangeValues(
  start: number,
  end: number,
  step = 1
): number[] {
  const items: number[] = [];
  for (let i = start; i <= end; i += step) items.push(i);
  return items;
}
