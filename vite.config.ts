import { defineConfig } from "vite";
import type { UserConfigExport } from "vitest/config";

export default defineConfig({
  base: "/litehouse-test-project/",
  test: {
    environment: "jsdom",
  },
});
