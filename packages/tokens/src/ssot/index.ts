/**
 * SSOT export layer — values sourced from token.json at build time.
 * Does not replace src/index.ts (legacy hand-maintained tokens).
 */

export {
  tokenJson,
  tokenMetadata,
  flatTokens,
  tokenPaths,
  tokenGroups,
  tokenEntries,
  getToken,
  getTokenStringValue,
  flattenTokenDocument,
  flatTokensToRecord,
  getTokenValue,
  getTokenString,
  type FlatTokenEntry,
} from "./load";

export {
  brandPrimaryFromJson,
  neutralGrayFromJson,
  functionalColorsFromJson,
  semanticColorsFromJson,
  textColorsFromJson,
  spacingScaleFromJson,
  spacingSemanticFromJson,
  radiusFromJson,
  shadowElevationFromJson,
  shadowSemanticFromJson,
  buildTokenGroups,
} from "./grouped";

export type { JsonTokenGroups } from "./grouped";

export type {
  TokenCompositeLeaf,
  TokenDocument,
  TokenLeaf,
  TokenLeafMeta,
  TokenMetadata,
  TokenPath,
  TokenValue,
} from "./types";

export { isTokenCompositeLeaf, isTokenLeaf, isTokenLeafMeta } from "./types";
