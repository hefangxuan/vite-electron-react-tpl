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
        "@renderer": join(process.cwd(), "src/renderer"),
        "@main": join(process.cwd(), "src/main"),
        "@common": join(process.cwd(), "src/common"),
        "@preload": join(process.cwd(), "src/preload"),
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
