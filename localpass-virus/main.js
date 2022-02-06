const { app, BrowserWindow, Menu } = require("electron");
const log = require("electron-log");
const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const util = require("util");
const electron = require("electron");

// development production

// Set env
process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "LocalPass",
    width: isDev ? 1024 : 1024,
    height: 768,
    icon: `${__dirname}/icon.png`,
    resizable: true,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();
  if (isDev) {
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
  } else {
    Menu.setApplicationMenu(null);
  }
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
