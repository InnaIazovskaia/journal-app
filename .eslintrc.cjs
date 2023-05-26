module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "xo", "prettier"],
  overrides: [
    {
      rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/naming-convention": "off",
        "no-negated-condition": "off",
      },
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
    },
    {
      files: ["src/vite-env.d.ts", "src/env.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
    {
      files: [
        "src/store/journal/journalSlice.ts",
        "src/tests/fixtures/journalFixtures.ts",
        "src/tests/store/journal/journalSlice.test.ts",
      ],
      rules: {
        "@typescript-eslint/consistent-type-assertions": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
