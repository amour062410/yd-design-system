import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    json: "index.ts",
    "tailwind-preset": "src/tailwind-preset.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  outExtension: () => ({ js: ".js" }),
  onSuccess: "cp src/tokens.css dist/tokens.css",
});
