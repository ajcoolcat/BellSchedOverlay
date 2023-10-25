const { app, BrowserWindow } = require('electron')
const { session } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    show: false
  })

  win.loadFile('index.html')

  win.once('ready-to-show', () => {
    win.show()
  })
}

const createBellSchWindow = () => {
  const bellwin = new BrowserWindow({
    width: 346,
    height: 90,
    show: false,
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    autoHideMenuBar: true
  })

  bellwin.loadFile('sched.html')
}

app.whenReady().then(() => {
  createWindow()
  //createBellSchWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})