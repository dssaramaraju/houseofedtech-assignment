import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/**
 * ✅ ESLint Configuration for Next.js + TypeScript
 * - Allows `any` usage (for rapid prototyping)
 * - Ignores unused variable warnings
 * - Compatible with Next.js App Router
 */
export default [
  {
    ignores: ["node_modules", ".next", "dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@next/next": nextPlugin,
    },
    rules: {
      // ✅ Allow flexible TypeScript for assignment demo
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // ✅ Next.js & general JS safety rules
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-unused-vars": "off",

      // ✅ Ensure good Next.js practices
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },
];
