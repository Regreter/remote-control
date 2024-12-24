const {ipcMain} = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')


function handleMouse(data) {
  // 解构获取鼠标坐标和屏幕信息
  let { clientX, clientY, screen, video } = data

  // 计算真实的鼠标位置（等比例缩放）：考虑到远程视频画面和实际屏幕可能存在尺寸差异，进行等比例换算
  let x = clientX * screen.width / video.width
  let y = clientY * screen.height / video.height

  // 移动鼠标并点击
  robot.moveMouse(x, y)
  robot.mouseClick()
}

function handleKey(data) {
  // 创建修饰键数组
  const modifiers = []

  // 检查并添加各种修饰键（组合键）
  if(data.meta) modifiers.push('meta')    // Command键(Mac)/Windows键
  if(data.shift) modifiers.push('shift')  // Shift键
  if(data.alt) modifiers.push('alt')      // Alt键
  if(data.option) modifiers.push('ctrl')  // Ctrl键
  
  // 将键码转换为小写的按键名
  let key = vkey[data.keyCode].toLowerCase()

  // 特殊按键映射表
  const specialKeys = {
    '<shift>': 'shift',
    '<enter>': 'enter',
    '<backspace>': 'backspace',
    '<delete>': 'delete',
    '<tab>': 'tab',
    '<escape>': 'escape',
    '<up>': 'up',
    '<down>': 'down',
    '<left>': 'left',
    '<right>': 'right',
    '<space>': 'space',
    '<home>': 'home',
    '<end>': 'end',
    '<pageup>': 'pageup',
    '<pagedown>': 'pagedown'
  }

  // 处理特殊按键
  if (specialKeys[key]) {
    robot.keyTap(specialKeys[key], modifiers)
    return
  }
}

module.exports = function() {
  ipcMain.on('robot', (e, type, data) => {
    console.log('robot:', type, data)
    if(type === 'mouse') {
      handleMouse(data)
    } else if(type === 'key') {
      handleKey(data)
    }
  })
}
