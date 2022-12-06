## vue3 官网 https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application
### 项目起步
```shell
 npm init vue@latest
```
### 配置 axios
```shell
npm i -S axios
```
### 在env.d.ts中配置
```js
import axios from "axios";

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        $axios:typeof axios
    }
}
```
### 配置 全局请求 Api

### 安装 tailwindcss
```shell
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# 创建您的配置文件
npx tailwindcss init -p
```
这将会在您的项目根目录创建一个最小化的 tailwind.config.js 文件：
```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```



### 安装预编译loader
已sass为例
```shell
npm i -D sass sass-loader
```

### 安装组件库
https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart
```shell
npm i vant
```
#### 按需引入组件样式
1. 安装插件
- 通过 npm 安装
npm i unplugin-vue-components -D

2. 配置插件
如果是基于 vite 的项目，在 vite.config.js 文件中配置插件：
```js
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```