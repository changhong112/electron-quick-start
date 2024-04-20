const { app, BrowserView, BrowserWindow } = require('electron');

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
    autoHideMenuBar: true
  });
  
  mainWin.loadFile('index-lifecycles.html');
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