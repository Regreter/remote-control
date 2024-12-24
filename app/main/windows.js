const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')

// 创建主窗口
let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // 启用上下文隔离
      enableRemoteModule: false, // 禁用 remote 模块
      nodeIntegration: false, // 禁用 Node 集成
      preload: path.join(__dirname, 'preload.js'), // 加载预加载脚本
    }
  });
  // mainWindow.webContents.openDevTools();
  // mainWindow.loadURL('https://www.baidu.com/');
  mainWindow.loadURL('http://localhost:3000');
}

// // 创建控制窗口
let controlWindow;
function createControlWindow(){
  controlWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 监听窗口关闭事件
  controlWindow.on('close', (e) => {
    e.preventDefault();  // 阻止默认的关闭行为
    // 可以在这里添加确认对话框
    if (require('electron').dialog.showMessageBoxSync({
      type: 'question',
      buttons: ['是', '否'],
      title: '确认',
      message: '确定要关闭傀儡端应用吗？'
    }) === 0) {
      // 在销毁窗口前发送状态变更事件
      mainWindow.webContents.send('control-state-change', '', 3);
      controlWindow.destroy();  // 只销毁当前窗口
    }
  });

  const url = `${path.join(__dirname, '../renderer/pages/control/index.html')}`
  controlWindow.loadFile(url)
}

// 主进程推送（告知状态）
function send(channel, ...args) {
  console.log('主进程推送（告知状态）:', channel, ...args);
  mainWindow.webContents.send(channel, ...args)
}

module.exports = {
  createMainWindow,
  createControlWindow,
  send
}