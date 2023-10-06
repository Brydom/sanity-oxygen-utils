import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
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
