const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // 点击按钮打开新窗口
  const oBtn = document.getElementById('btn');

  oBtn.addEventListener('click', () => {
    // 如何创建窗口
    // ipc进程间通信 主进程与渲染进程
    ipcRenderer.send('open-new-window', 'wins/win-index/index.html')
  });
});