<script setup lang="ts">
const { ipcRenderer } = window.require('electron');
// 最小化
const minimize = () => {
  ipcRenderer.send('detach:service', { type: 'minimize' })
}
// 最大化
const maximize = () => {
  ipcRenderer.send('detach:service', { type: 'maximize' })
}
// 关闭窗口
const close = () => {
  ipcRenderer.send('detach:service', { type: 'close' })
}
</script>

<template>
  <div class="info">
    <!-- <img :src="plugInfo.logo" /> -->
    <span>rubick 系统菜单</span>
  </div>
  <div class="handle-container">
    <div class="handle">
      <div class="devtool" @click="openDevTool" title="开发者工具"></div>
    </div>
    <!-- <div class="window-handle" v-if="process.platform !== 'darwin'">
      <div class="minimize" @click="minimize"></div>
      <div class="maximize" @click="maximize"></div>
      <div class="close" @click="close"></div>
    </div> -->
    <div class="close" @click="close">x</div>
  </div>
</template>

<style lang="less">
.info {
  width: 100%;
  height: 30px;
  background: red;
}
</style>
