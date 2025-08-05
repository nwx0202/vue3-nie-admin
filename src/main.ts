import { createApp } from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import './style.css'
import 'virtual:svg-icons-register';
import 'uno.css'

createApp(App).use(createPinia()).mount('#app')
