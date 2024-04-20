const { app, BrowserView, BrowserWindow, ipcMain } = require('electron');

ipcMain.on('open-new-window', (event, url) => {
  const indexWin = new BrowserWindow({
    width: 400,
    height: 250
  })
  console.log(8, url);
  // indexWin.loadFile('./wins/win-index/index.html')
  indexWin.loadFile(url)
})

function createWindow() {
  let mainWin = new BrowserWindow({
    x: 10,
    y: 10,
    show: false,
    width: 600,
    height: 400,
    maxWidth: 1200,
    maxHeight: 800,
    minWidth: 400,
    minHeight: 200,
    autoHideMenuBar: true,
    title: '打开新窗口',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  
  mainWin.loadFile('wins/win-main/index.html');
  mainWin.on('ready-to-show', () => {
    mainWin.show()
  })
  mainWin.webContents.on('dom-ready', () => {
    console.log('2 => dom-ready');
  })
  mainWin.webContents.on('did-finish-load', () => {
    console.log('3 => did-finish-load');
  })
  mainWin.on('close', () => {
    console.log('8 => this window is closed');
    mainWin = null;
  })

  mainWin.webContents.openDevTools()
}

app.on('ready', () => {
  console.log('1 => ready');
  createWindow()
})

app.on('window-all-closed', () => {
  console.log('4 => window-all-closed');
  app.quit()
})

app.on('before-quit', () => {
  console.log('5 => before-quit');
})

app.on('will-quit', () => {
  console.log('6 => will-quit');
})

app.on('quit', () => {
  console.log('7 => quit');
})


/**
 * 生命周期顺序
 *  1 => ready
    2 => dom-ready
    3 => did-finish-load
    8 => this window is closed   
    4 => window-all-closed       
    5 => before-quit
    6 => will-quit
    7 => quit
 */