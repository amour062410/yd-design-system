import type {
  TokenCompositeLeaf,
  TokenDocument,
  TokenLeaf,
  TokenPath,
  TokenValue,
} from "./types";
import { isTokenCompositeLeaf, isTokenLeafMeta } from "./types";

export type FlatTokenEntry = {
  path: import("./types").TokenPath;
  value: import("./types").TokenValue | TokenCompositeLeaf;
  meta: import("./types").TokenLeaf;
};

const SKIP_KEYS = new Set(["$metadata"]);

export function flattenTokenDocument(
  doc: Omit<TokenDocument, "$metadata"> | TokenDocument,
  prefix = ""
): FlatTokenEntry[] {
  const entries: FlatTokenEntry[] = [];

  const walk = (node: unknown, path: string) => {
    if (node === null || node === undefined) return;

    if (isTokenLeafMeta(node)) {
      entries.push({
        path,
        value: node.value,
        meta: node,
      });
      return;
    }

    if (isTokenCompositeLeaf(node)) {
      entries.push({
        path,
        value: node as TokenCompositeLeaf,
        meta: node,
      });
      return;
    }

    if (typeof node !== "object" || Array.isArray(node)) return;

    for (const [key, child] of Object.entries(node)) {
      if (SKIP_KEYS.has(key)) continue;
      const nextPath = path ? `${path}.${key}` : key;
      walk(child, nextPath);
    }
  };

  const { $metadata: _, ...rest } = doc as TokenDocument;
  for (const [key, child] of Object.entries(rest)) {
    walk(child, key);
  }

  return entries;
}

export function flatTokensToRecord(
  entries: FlatTokenEntry[]
): Record<TokenPath, TokenValue | TokenCompositeLeaf> {
  const out: Record<string, TokenValue | TokenCompositeLeaf> = {};
  for (const { path, value } of entries) {
    out[path] = value;
  }
  return out;
}

export function getTokenValue(
  flat: Record<TokenPath, TokenValue | TokenCompositeLeaf>,
  path: TokenPath
): TokenValue | TokenCompositeLeaf | undefined {
  return flat[path];
}

export function getTokenString(
  flat: Record<TokenPath, TokenValue | TokenCompositeLeaf>,
  path: TokenPath
): string | undefined {
  const v = flat[path];
  return typeof v === "string" || typeof v === "number" ? String(v) : undefined;
}

export function listTokenPaths(
  flat: Record<TokenPath, TokenValue | TokenCompositeLeaf>
): TokenPath[] {
  return Object.keys(flat).sort();
}
