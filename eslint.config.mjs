import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
    ...tseslint.configs.recommended,
    globalIgnores([
        "dist/**",
        ".astro/**",
        "node_modules/**",
    ]),
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
]);

export default eslintConfig;
