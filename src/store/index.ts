import {App} from 'vue';
import {createPinia} from 'pinia';

const store = createPinia();

// 全局注册store
export function setupStore(app: App<Element>) {
    app.use(store);
}

export * from './modules/user.store';
export {store}