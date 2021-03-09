import theme from "../src/renderer/styles/theme";
import styleImport from "vite-plugin-style-import";

const { join, resolve } = require("path");
const reactRefresh = require("@vitejs/plugin-react-refresh");
const { chrome } = require("./electron-vendors");
/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
  root: join(process.cwd(), "./src/renderer"),
  resolve: {
    alias: {
      "@/": resolve(__dirname, "../src/renderer") + "/",
    },
  },
  // plugins: [vue()],
  base: "./",
  build: {
    // sourcemap: 'inline',
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: join(process.cwd(), "dist/source/renderer"),
    assetsDir: ".",
    rollupOptions: {
      external: require("./external-packages").default,
    },
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: theme,
      },
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
        // {
        //     libraryName: 'vant',
        //     esModule: true,
        //     resolveStyle: (name) => {
        //         return `vant/es/${name}/style/index`;
        //     },
        // },
        // {
        //     libraryName: 'element-plus',
        //     resolveStyle: (name) => {
        //         return `element-plus/lib/theme-chalk/${name}.css`;
        //     },
        //     resolveComponent: (name) => {
        //         return `element-plus/lib/${name}`;
        //     },
        // },
      ],
    }),
  ],
};
