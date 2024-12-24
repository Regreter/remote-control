const { app, globalShortcut } = require('electron')
const handleIPC = require('./ipc')
const { createMainWindow, createControlWindow } = require('./windows.js')

// 添加应用激活事件处理
app.on('ready', () => {
  createMainWindow();
  // createControlWindow()
  handleIPC()
  require('./robot.js')()
})

// 添加应用退出事件处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 确保在应用退出时注销快捷键
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})