import {RouteRecordRaw} from 'vue-router';
import {constantRoutes} from '@/router';
import {store} from '@/store';
import MenuAPI, {RouteVO} from '@/api/system/menu.api';
import { defineStore } from 'pinia';

const modules = import.meta.glob('@/views/**/*.vue');
const Layout = () => import('@/layouts/index.vue');

export const usePermissionStore = defineStore('permission', () => {
    // 所有路由，包括动态和静态路由
    const routes = ref<RouteRecordRaw[]>([]);
    // 混合模式左侧菜单
    const mixLeftMenus = ref<RouteRecordRaw[]>([]);

    // 生成动态路由
    function generateRoutes() {
        return new Promise<RouteRecordRaw[]>((resolve, reject) => {
            MenuAPI.getRoutes().then(data => {
                const dynamicRoutes = transformRoutes(data);
                routes.value = constantRoutes.concat(dynamicRoutes);
                resolve(dynamicRoutes);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * 混合模式菜单下根据顶部菜单路径设置左侧菜单
     * @param topMenuPath 顶部菜单路径
     */
    const setMixLeftMenus = (topMenuPath: string) => {
        const matchedItem = routes.value.find(item => item.path === topMenuPath);
        if (matchedItem && matchedItem.children) {
            mixLeftMenus.value = matchedItem.children;
        }
    };

    return {
        routes,
        generateRoutes,
        mixLeftMenus,
        setMixLeftMenus
    }
});

/**
 * 转换路由数据为组件
 */
const transformRoutes = (routes: RouteVO[]) => {
    const asyncRoutes: RouteRecordRaw[] = [];
    routes.forEach(route => {
        const tmpRoute = {...route} as RouteRecordRaw;
        // 顶级菜单，替换为Layout组件
        if (tmpRoute.component.toString() === 'Layout') {
            tmpRoute.component = Layout;
        } else {
            const component = modules[`@/views/${tmpRoute.component}.vue`];
            if (component) {
                tmpRoute.component = component;
            } else {
                tmpRoute.component = modules[`@/view/error-page/404.vue`];
            }
        }

        if (tmpRoute.children) {
            tmpRoute.children = transformRoutes(route.children);
        }
        asyncRoutes.push(tmpRoute);
    });
    return asyncRoutes;
};

/**
 * 在组件外使用Pinia store实例
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
    return usePermissionStore(store);
}