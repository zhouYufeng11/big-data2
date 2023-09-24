import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Message } from '@arco-design/web-vue';
import { createPinia } from 'pinia'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import { autoRefresh } from './utils/index';
// 状态管理
const pinia = createPinia();

const app = createApp(App);

// 状态管理
app.use(pinia);
// 路由
app.use(router);
// 字体
app.use(ArcoVueIcon);
// 提示
Message._context = app._context;

app.config.globalProperties.$message = Message;

// console.log(app.config);
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // console.log(err);
  // console.log(info);
}


app.mount('#app')


window.scroll(0, 0);


//  浏览器强制刷新
const delay = 5 * 60 * 1000; // 5 min
// const delay: any = 5 * 1000;
autoRefresh(delay);
