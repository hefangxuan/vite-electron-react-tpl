// import { app, BrowserWindow, ipcMain } from "electron";
// import { join } from "path";
// import { URL } from "url";
// import { globalConfig } from "../common/store";
//
// const gotTheLock = app.requestSingleInstanceLock();
//
// if (!gotTheLock) {
//   app.quit();
// } else {
//   /**
//    * Workaround for TypeScript bug
//    * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
//    */
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const env = import.meta.env;
//
//   globalConfig.set("a", 1);
//
//   console.log(22, globalConfig.get("a"));
//   ipcMain.handle("globalConfig", (event, key) => {
//     return globalConfig.get(key);
//   });
//
//   // Install "Vue.js devtools BETA"
//   // if (env.MODE === 'development') {
//   //   app.whenReady()
//   //     .then(() => import('electron-devtools-installer'))
//   //     .then(({default: installExtension}) => {
//   //       /** @see https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg */
//   //       const VUE_DEVTOOLS_BETA = 'ljjemllljcmogpfapbkkighbhhppjdbg';
//   //       return installExtension(VUE_DEVTOOLS_BETA);
//   //     })
//   //     .catch(e => console.error('Failed install extension:', e));
//   // }
//
//   let mainWindow: BrowserWindow | null = null;
//
//   async function createWindow() {
//     mainWindow = new BrowserWindow({
//       show: false,
//       webPreferences: {
//         nodeIntegration: true,
//         preload: join(__dirname, "../preload/index.cjs.js"),
//         contextIsolation: true, // Spectron tests can't work with contextIsolation: true
//         enableRemoteModule: true, // Spectron tests can't work with enableRemoteModule: false
//       },
//     });
//
//     /**
//      * URL for main window.
//      * Vite dev server for development.
//      * `file://../renderer/index.html` for production and test
//      */
//     const pageUrl: any =
//       env.MODE === "development"
//         ? env.VITE_DEV_SERVER_URL
//         : new URL("renderer/index.html", "file://" + __dirname).toString();
//
//     await mainWindow.loadURL(pageUrl);
//     mainWindow.maximize();
//     mainWindow.show();
//
//     if (env.MODE === "development") {
//       mainWindow.webContents.openDevTools();
//     }
//   }
//
//   app.on("second-instance", () => {
//     // Someone tried to run a second instance, we should focus our window.
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore();
//       mainWindow.focus();
//     }
//   });
//
//   app.on("window-all-closed", () => {
//     if (process.platform !== "darwin") {
//       app.quit();
//     }
//   });
//
//   app
//     .whenReady()
//     .then(createWindow)
//     .catch((e) => console.error("Failed create window:", e));
//
//   // Auto-updates
//   // if (env.PROD) {
//   //   app.whenReady()
//   //     .then(() => import('electron-updater'))
//   //     .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
//   //     .catch((e) => console.error('Failed check updates:', e));
//   // }
// }
import { isJSON } from "hefx-utils";

import { app, ipcMain } from "electron";

// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import os from "os";
import { globalConfig } from "../common/store";
import AppMainWindow from "./AppMainWindow";
import { getIPAdress, isDevEnv, isObjectNum } from "../common/utils";
import installExtension from "electron-devtools-installer";
import { getBaidu } from "../renderer/api/test";

// 判断实例数, 超过3个将会退出
isObjectNum(app, 3);

app.allowRendererProcessReuse = true;
const isWin7 = os.release().startsWith("6.1");
// win7部分系统白屏优化: 下关闭硬件加速
if (isWin7) app.disableHardwareAcceleration();

// =====================初始化一下参数必须在主进程做的 开始====================== //

globalConfig.set("local.ip", getIPAdress());

/**
 * 类的实现
 */
class MainApp {
  private mainWindow: any;

  // private tray: any;

  constructor() {
    this.initAppLife();
    this.initIPC();
  }

  // app 的生命周期
  initAppLife() {
    // 监听软件运行
    app.on("ready", async () => {
      // const a = session.defaultSession.getAllExtensions();
      // if (isDevEnv) {
      //   installExtension(REACT_DEVELOPER_TOOLS).then();
      // }
      if (isDevEnv) {
        try {
          const r = await installExtension("fmkadmapgofadopljbjfkapdkoienihi");
          console.log(`Added Extension: `, r);
        } catch (e) {
          console.log("An error occurred: ", e);
        }
      }
      await app.whenReady();
      this.createMainWindow();
    });

    // 监听软件关闭
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("before-quit", () => {
      console.log("before-quit");
      this.mainWindow.destoryMainWindow();
    });
  }

  // 所有的IPC通信都放这边
  initIPC() {
    globalConfig.set("a", 1);
    console.log(33333312223232222, isJSON("1122"));
    ipcMain.handle("globalConfig", (event, key) => {
      return globalConfig.get(key);
    });

    ipcMain.handle("getBaidu", async (event) => {
      return await getBaidu();
    });
  }

  createMainWindow() {
    this.mainWindow = new AppMainWindow();
  }
}
// eslint-disable-next-line no-new
new MainApp();
