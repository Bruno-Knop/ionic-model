const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let appWindow;

function createWindow() {
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

  const windowWidth = 800;
  const windowHeight = 800;

  const x = width - windowWidth; // Define a coordenada X
  const y = height - windowHeight; // Define a coordenada Y

  appWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: x, // Define a coordenada X
    y: y, // Define a coordenada Y
    resizable: false,
    icon: path.join(__dirname, '/www/assets/images/icon.ico'),
    webPreferences: {
      nodeIntegration: true
    },
  });

  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/www/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  appWindow.on('closed', function () {
    appWindow = null;
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(null);
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.exit(0);
});

app.on('activate', function () {
  if (appWindow === null) {
    createWindow();
  }
});