import { App } from "vue";
import { hashPerms } from "./permission";

// 全局注册directive方法
export function setupDirective(app: App<Element>) {
    // 使v-hasPerms在所有组件中都可用
    app.directive('hasPerm', hashPerms);
}