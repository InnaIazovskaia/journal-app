import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "setupTests.ts",
    environment: "jsdom",
    mockReset: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "istanbul",
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      include: ["src/**/*"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/vite-env.d.ts",
        "src/main.tsx",
      ],
      all: true,
    },
  },
});
