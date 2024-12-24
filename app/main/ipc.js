const { ipcMain, desktopCapturer } = require('electron')
const { send, createControlWindow } = require('./windows.js')

module.exports = function () {
  // 主进程响应（返回控制码）
  ipcMain.handle('login', async () => {
    // 先mock一个随机六位数
    const code = Math.floor(Math.random() * (999999 - 100000)) + 100000
    return code
  });

  // 处理渲染进程发起请求（进行控制）
  ipcMain.on('control', async (e, remoteCode) => {
    // 这里跟服务端交互， 先mock返回
    send('control-state-change', remoteCode, 1)
    // 创建控制窗口
    createControlWindow()
  })

  // IPC监听器，用于发送屏幕捕获的源
  ipcMain.handle('getDesktopSources', async () => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    return sources;
  });
}