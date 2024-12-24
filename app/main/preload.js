const { contextBridge, ipcRenderer } = require('electron');

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 暴露发送消息的函数
  send: (channel, data) => {
    console.log('发送消息:', channel, data);
    ipcRenderer.send(channel, data);
  },
  // 暴露接收消息的函数
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, data, type) => {
      console.log('监听消息:', event, channel, data, type);
      callback(event, data, type);
    });
  },
  // 渲染进程请求主进程
  invoke: (channel, ...args) => {
    console.log('渲染进程请求主进程:', channel, args);
    return ipcRenderer.invoke(channel,...args);
  },
  // 移除监听
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
