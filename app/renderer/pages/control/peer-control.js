const { ipcRenderer } = require('electron')
const EventEmitter = require('events') 
const peer = new EventEmitter()

const getScreenStream = async () => {
  const sources = await ipcRenderer.invoke('getDesktopSources')
  // 捕获桌面流
  navigator.webkitGetUserMedia({
    audio: false, // 不需要音频
    video: {
      mandatory: {
        chromeMediaSource: 'desktop', // 指定媒体源为桌面
        chromeMediaSourceId: sources[0].id, // 指定桌面源ID
        maxWidth: window.screen.width, // 桌面视频的最大宽度
        maxHeight: window.screen.height, // 桌面视频的最大高度
      }
    }
  }, (stream) => {
    peer.emit('add-stream', stream);
  }, (err) => {
      console.log(err);
    }
  )
}

getScreenStream()

// 打开摄像头
// getUserMedia()
function getUserMedia() {
  navigator.mediaDevices.getUserMedia({
    audio: true, 
    video: {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
      frameRate: { max: 30 }
    }
  }).then((stream) => {
    const screenVideo = document.getElementById('screen-video');
    screenVideo.srcObject = stream;
    screenVideo.onloadedmetadata = function () {
      screenVideo.play();
    }
  })
}

module.exports = peer