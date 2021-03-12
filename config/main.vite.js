const smartAsset = require("rollup-plugin-smart-asset");
const { node } = require("./electron-vendors");
const { join } = require("path");

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = () => {
  return {
    resolve: {
      alias: {
        "@main": join(process.cwd(), "./src/main") + "/",
      },
    },
    publicDir: "src/main/public",
    build: {
      sourcemap: "inline",
      target: `node${node}`,
      outDir: "dist/source/main",
      minify: process.env.MODE === "development" ? false : "terser",
      lib: {
        entry: "src/main/index.ts",
        formats: ["cjs"],
      },
      rollupOptions: {
        // plugins: [smartAsset({ include: ["src/main/assets"] })],
        external: require("./external-packages").default,
        output: {
          entryFileNames: "[name].[format].js",
          chunkFileNames: "[name].[format].js",
          assetFileNames: "[name].[ext]",
        },
      },
      emptyOutDir: true,
    },
  };
};
