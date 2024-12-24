import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    // 定义响应式数据
    const state = reactive({
      remoteCode: '', // 控制码
      localCode: '', // 本地码
      controlText: '' // 控制状态
    })

    const login = async () => {
      // 渲染进程请求主进程（获取控制码）
      const code = await window.electronAPI.invoke('login');
      console.log('获取控制码:',code);
      state.localCode = code
    }

    // 设置控制码
    const setRemoteCode = (e: Event) => {
      state.remoteCode = (e.target as HTMLInputElement).value
    }

    // 申请控制
    const startControl = (remoteCode: string) => {
      // 渲染进程发起请求（申请控制）
      window.electronAPI.send('control', remoteCode)
    }

    // 控制状态变更，设置控制状态
    const handleControlState = (e: any, name: string, type: number) => {
      let text = ''
      if (type === 1) {
        text = `正在远程控制${name}`
      } else if (type === 2) {
        text = `远程控制${name}成功`
      } else if (type === 3) {
        text = ''
      }
      state.controlText = text
    }

    onMounted(() => {
      // 进行登录获取控制码
      login()
      // 监听主进程推送内容（获取控制状态）
      window.electronAPI.on('control-state-change', handleControlState)
    })

    onUnmounted(() => {
      // 销毁监听
      window.electronAPI.removeAllListeners('control-state-change')
    })
    return {
      ...toRefs(state),
      setRemoteCode,
      startControl
    }
  }
})