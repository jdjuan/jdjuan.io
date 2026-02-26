import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  prettier,
];

export default eslintConfig;
