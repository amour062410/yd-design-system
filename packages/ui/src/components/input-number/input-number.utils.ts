export function clampNumber(value: number, min?: number, max?: number) {
  let next = value;
  if (min !== undefined && next < min) next = min;
  if (max !== undefined && next > max) next = max;
  return next;
}

export function roundToPrecision(value: number, precision?: number) {
  if (precision === undefined) return value;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function formatNumberValue(
  value: number | null | undefined,
  precision?: number,
  formatter?: (value: number | undefined) => string
) {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  const normalized = precision !== undefined ? roundToPrecision(value, precision) : value;
  if (formatter) return formatter(normalized);
  if (precision !== undefined) return normalized.toFixed(precision);
  return String(normalized);
}

export function parseNumberValue(
  raw: string,
  parser?: (displayValue: string | undefined) => number | undefined
) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (parser) {
    const parsed = parser(trimmed);
    return parsed === undefined || Number.isNaN(parsed) ? null : parsed;
  }
  const parsed = Number(trimmed.replace(/,/g, ""));
  return Number.isNaN(parsed) ? null : parsed;
}

export function getValidStepValue(
  current: number | null,
  step: number,
  direction: 1 | -1,
  min?: number,
  max?: number,
  precision?: number
) {
  const base = current ?? (min !== undefined && min > 0 ? min : 0);
  const next = roundToPrecision(base + step * direction, precision);
  return clampNumber(next, min, max);
}
