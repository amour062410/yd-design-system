/** Convert #RRGGBB to "R, G, B" */
export function hexToRgb(hex: string): string {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 6) return "—";
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return "—";
  return `${r}, ${g}, ${b}`;
}

/** Parse hex or rgba() into "R, G, B" display string */
export function colorToRgb(value: string): string {
  const rgbaMatch = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i
  );
  if (rgbaMatch) {
    const r = Math.round(Number(rgbaMatch[1]));
    const g = Math.round(Number(rgbaMatch[2]));
    const b = Math.round(Number(rgbaMatch[3]));
    return `${r}, ${g}, ${b}`;
  }
  if (value.startsWith("#")) return hexToRgb(value);
  return "—";
}

export type ColorSwatchDefinition = {
  name: string;
  token: string;
  /** Raw CSS color — hex or rgba */
  value: string;
  /** Uppercase hex or original rgba for display / copy */
  display: string;
  rgb: string;
  usage?: string;
};

export function toSwatch(
  name: string,
  token: string,
  value: string,
  usage?: string
): ColorSwatchDefinition {
  const display = value.startsWith("#") ? value.toUpperCase() : value;
  return {
    name,
    token,
    value,
    display,
    rgb: colorToRgb(value),
    usage,
  };
}
