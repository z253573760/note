import nodeRelove from "@rollup/plugin-node-resolve";
import server from "rollup-plugin-server";
import replace from "rollup-plugin-replace";
import path from "path";

const resolve = (p) => path.resolve("", p);
const name = "vue-next";
export default {
  input: "src/main.js",
  output: [
    {
      name,
      format: "umd",
      file: resolve(`dist/${name}.umd.js`),
      sorcemap: true,
    },
    {
      name,
      format: "esm",
      file: resolve(`dist/${name}.esm.js`),
      sorcemap: true,
    },
    {
      name,
      format: "cjs",
      file: resolve(`dist/${name}.cjs.js`),
      sorcemap: true,
    },
  ],
  plugin: [
    nodeRelove({
      extensions: [".js"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    server({
      on: true,
      openPage: "public/index.html",
      port: 3000,
    }),
  ],
};
