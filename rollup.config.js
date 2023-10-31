import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

export default {
  input: "demo-storefront/app/sanity-oxygen-utils/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    terser({
      format: {
        comments: "all",
      },
    }),
  ],
};
