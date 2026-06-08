import tokenDocument from "../../token.json";
import {
  flatTokensToRecord,
  flattenTokenDocument,
  getTokenString,
  getTokenValue,
  listTokenPaths,
} from "./flatten";
import { buildTokenGroups, type JsonTokenGroups } from "./grouped";
import type { TokenDocument, TokenMetadata } from "./types";

const doc = tokenDocument as TokenDocument;

/** Raw token.json (SSOT source) */
export const tokenJson: TokenDocument = doc;

/** Design metadata from token.json */
export const tokenMetadata: TokenMetadata = doc.$metadata;

const flatEntries = flattenTokenDocument(doc);

/** Flat map: dot-path → value */
export const flatTokens = flatTokensToRecord(flatEntries);

/** All leaf paths in stable sort order */
export const tokenPaths = listTokenPaths(flatTokens) as readonly string[];

/** Grouped primitive + semantic views derived from JSON */
export const tokenGroups: JsonTokenGroups = buildTokenGroups(flatTokens);

/** Lookup by dot-path */
export function getToken(path: string) {
  return getTokenValue(flatTokens, path);
}

/** Lookup string/number leaf only */
export function getTokenStringValue(path: string): string | undefined {
  return getTokenString(flatTokens, path);
}

/** Flat entries with meta (type, token alias, description) */
export { flatEntries as tokenEntries };

export type { FlatTokenEntry } from "./flatten";
export { flattenTokenDocument, flatTokensToRecord, getTokenString, getTokenValue };
