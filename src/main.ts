import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './style.css';
import 'virtual:svg-icons-register';
import 'uno.css';
import router from '@/router';
import { setupDirective } from './directive';
import i18n from './lang';

const app = createApp(App);
// 全局注册自定义指令
setupDirective(app);

app.use(createPinia()).use(router).use(i18n).mount('#app')
