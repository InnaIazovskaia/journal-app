module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
};
