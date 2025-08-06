import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import './style.css';
import 'virtual:svg-icons-register';
import 'uno.css';
import router from '@/router';

createApp(App).use(createPinia()).use(router).mount('#app')
