import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  external: ["react"],
  clean: true,
  outExtension: () => ({ js: ".js" }),
  onSuccess: "cp src/themes.css dist/themes.css",
});
