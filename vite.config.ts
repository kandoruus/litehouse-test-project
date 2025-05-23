import { defineConfig } from "vite";
import type { UserConfigExport } from "vitest/config";

export default defineConfig({
  base: "/litehouse-test-project/",
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "text-summary", "html"],
      exclude: ["**/tests/**"],
    },
  },
});
