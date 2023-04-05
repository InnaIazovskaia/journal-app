/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.test.ts", "**/src/**/*.test.tsx"],
  resolver: "jest-ts-webcompat-resolver",
  setupFilesAfterEnv: ["<rootDir>/setupTest.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
};
