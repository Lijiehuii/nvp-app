# 项目起步

## reset.css 重置样式
将reset.css文件放入 项目的public文件夹
```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

在 public index.html中引入
```html
    <link rel="icon" href="<%= BASE_URL %>reset.css">
```

### 安装预编译loader
已sass为例
```shell
npm i -D sass sass-loader
```

## 选择性设置devServe的proxy
在vue.config.js 中设置
```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //...
  }
})
```

## 安装三方库
先安装三个常用的库
1. axios 使用 axios vue 插件
```
npm i -S vue-axios-plugin
```
> 在 src 里的main.js中配置该三方库
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
}),

// 在主页面测试
created(){
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("https://apis.netstart.cn/one/channel/one/0")
        .then(({ data }) => {
          console.log(data);
        });
    },
  },
```

2. 安装lodash
> 安装 lodash-es 可以按需引入减小项目的体积
```shell
npm i lodash-es -S
```

3. 安装UI库
vue 移动端常用的Ui库有
- vant
- minUI(饿了么)
- Wot Design(京东)
- NutUI(京东轻量级)

vue 桌面端常用
- elementUI(饿了么)
- ant Design Vue(阿里巴巴)

### UI库的安装

1. 下载 vant-ui
```shell
## Vue 3项目
npm i vant -S

## Vue 2项目
npm i vant@latest-v2 -S
```

2. 按需引入
首先,安装 babel-plugin-import
```shell
npm i babel-plugin-import -D
``` 
然后,将 babel.config.js 修改为:
```js
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```
























