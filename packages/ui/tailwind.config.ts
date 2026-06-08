import type { Config } from "tailwindcss";
import tokensPreset from "@yd-ds/tokens/tailwind";

const config: Config = {
  presets: [tokensPreset as Config],
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
