/**
 * electron窗口初始化
 */

import { BrowserWindow, screen } from "electron";

import * as path from "path";
import { URL } from "url";
import { isDevEnv, VITE_DEV_SERVER_URL } from "../common/utils";
import { join } from "path";

export default class AppMainWindow {
  private mainWindow: any;

  private motionWindow: any;

  constructor() {
    this.initMainWindow();
  }

  initMainWindow() {
    this.createWindow();
  }

  createMotionWindow() {
    // eslint-disable-next-line prefer-const
    this.motionWindow = new BrowserWindow({
      frame: false,
      width: 470,
      height: 280,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });

    if (isDevEnv) {
      this.motionWindow
        .loadURL(
          `file://${path.join(process.cwd(), "files/loading/loading.html")}`
        )
        .catch((e: any) => console.log("加载文件错误: ", e));
    } else {
      this.motionWindow
        .loadURL(`file://${path.join(__dirname, "files/loading/loading.html")}`)
        .catch((e: any) => console.log("加载文件错误: ", e));
    }
    this.motionWindow.on("closed", () => {
      console.log("loading, 窗口关闭");
      if (this.motionWindow) this.motionWindow = null;
    });
  }

  createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // 主窗口配置
    const config = {
      width: width * 0.8,
      height: height * 0.8,
      minWidth: width * 0.8,
      minHeight: height * 0.8,
      autoHideMenuBar: false,
      // title: appName,
      backgroundColor: "#fff",
      // fullscreen: false,
      webPreferences: {
        // nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs.js"),
        // contextIsolation: true,
        enableRemoteModule: true,
      },
      show: false,
    };

    // eslint-disable-next-line prefer-const
    this.mainWindow = new BrowserWindow(config);

    // 隐藏默认菜单
    this.mainWindow.setMenuBarVisibility(false);

    // 创建loading窗口
    // this.createMotionWindow();
    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const pageUrl: any = isDevEnv
      ? VITE_DEV_SERVER_URL
      : new URL("renderer/index.html", "file://" + __dirname).toString();

    this.mainWindow.loadURL(pageUrl);

    // 监听主窗口完成
    this.mainWindow.on("ready-to-show", () => {
      // this.mainWindow.setOpacity(0);
      setTimeout(() => {
        // this.mainWindow.setOpacity(1);
        if (this.motionWindow) {
          // this.motionWindow.setOpacity(0);
          this.motionWindow.close();
          this.motionWindow?.destroy();
        }
        this.mainWindow.show();
      }, 1000);
    });
  }

  initEvents() {
    // 窗口关闭的监听
    this.mainWindow.on("closed", () => {
      // console.log('closed')
      this.mainWindow = null;
    });
  }

  destoryMainWindow() {
    this.mainWindow = null;
  }

  // 统一发送渲染进程的消息函数
  send(key: string, value: any) {
    if (this.mainWindow) {
      this.mainWindow.webContents.send(key, value);
    }
  }
}
