import { ipcRenderer } from 'electron'

// 自定义鼠标移动钩子
const useDrag = () => {
  let animationId
  let mouseX
  let mouseY
  let clientWidth = 0
  let clientHeight = 0
  let draggable = true

  const onMouseDown = (e) => {
    if (e.button === 2) return
    draggable = true
    mouseX = e.clientX
    mouseY = e.clientY

    if (Math.abs(document.body.clientWidth - clientWidth) > 5) {
      clientWidth = document.body.clientWidth
    }
    if (Math.abs(document.body.clientHeight - clientHeight) > 5) {
      clientHeight = document.body.clientHeight
    }

    document.addEventListener('mouseup', onMouseUp)

    // 启动主进程通信
    animationId = requestAnimationFrame(moveWindow)
  }

  const onMouseUp = () => {
    draggable = false
    document.removeEventListener('mouseup', onMouseUp)
    cancelAnimationFrame(animationId)
  }

  const moveWindow = () => {
    ipcRenderer.send('msg-trigger', {
      type: 'windowMoving',
      data: {
        mouseX,
        mouseY,
        width: clientWidth,
        height: clientHeight
      }
    })
    if (draggable) animationId = requestAnimationFrame(moveWindow)
  }

  return {
    onMouseDown
  }
}

export default useDrag
