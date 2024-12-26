# Remote Control

基于 Electron + Vue3 + Vite 的远程控制应用。

## 技术栈

- 主进程: Electron
- 渲染进程: Vue3 + Vite + TypeScript
- 远程控制: robotjs

## 项目结构
bash
remote-control/
├── app/
│ ├── main/ # Electron 主进程
│ └── renderer/ # Vue3 渲染进程
├── package.json
└── README.md

## 开发环境搭建

1. 安装依赖
bash
安装主进程依赖
npm install
安装渲染进程依赖
cd app/renderer/src/main
npm install
2. 重建 robotjs（确保与 Electron 版本匹配）
npx electron-rebuild
3. 启动开发环境
npm run start
