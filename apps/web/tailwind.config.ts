// tailwind config is required for editor support

import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;