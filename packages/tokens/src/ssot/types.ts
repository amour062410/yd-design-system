/** W3C / Figma-style token leaf in token.json */
export type TokenValue = string | number;

export type TokenLeafMeta = {
  value: TokenValue;
  type?: string;
  token?: string;
  alias?: string;
  description?: string;
  px?: number;
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
};

/** Composite shadow / effect leaf (no single `value` field) */
export type TokenCompositeLeaf = {
  type: string;
  token?: string;
  color?: string;
  offsetX?: string;
  offsetY?: string;
  blur?: string;
  spread?: string;
  description?: string;
};

export type TokenLeaf = TokenLeafMeta | TokenCompositeLeaf;

export function isTokenLeafMeta(node: unknown): node is TokenLeafMeta {
  return (
    typeof node === "object" &&
    node !== null &&
    "value" in node &&
    (typeof (node as TokenLeafMeta).value === "string" ||
      typeof (node as TokenLeafMeta).value === "number")
  );
}

export function isTokenCompositeLeaf(node: unknown): node is TokenCompositeLeaf {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    !("value" in node)
  );
}

export function isTokenLeaf(node: unknown): node is TokenLeaf {
  return isTokenLeafMeta(node) || isTokenCompositeLeaf(node);
}

/** Dot-path key, e.g. `color.brand.primary.6` */
export type TokenPath = string;

export type FlatTokenEntry = {
  path: TokenPath;
  value: TokenValue | TokenCompositeLeaf;
  meta: TokenLeaf;
};

export type TokenMetadata = {
  name: string;
  figmaFileKey?: string;
  figmaFileName?: string;
  figmaPage?: string;
  generatedAt?: string;
  source?: string[];
  grid?: string;
};

export type TokenDocument = {
  $metadata: TokenMetadata;
  color: Record<string, unknown>;
  spacing: Record<string, unknown>;
  radius: Record<string, unknown>;
  typography: Record<string, unknown>;
  shadow: Record<string, unknown>;
};
