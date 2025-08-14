import {RouteRecordRaw} from 'vue-router';
import router, {constantRoutes} from '@/router';
import {store} from '@/store';
import MenuAPI, {type RouteVO} from '@/api/system/menu.api';
import { defineStore } from 'pinia';
import { no } from 'element-plus/es/locales.mjs';

const modules = import.meta.glob('@/views/**/*.vue');
const Layout = () => import('@/layouts/index.vue');

export const usePermissionStore = defineStore('permission', () => {
    // 所有路由，包括动态和静态路由
    const routes = ref<RouteRecordRaw[]>([]);
    // 混合模式左侧菜单
    const mixLayoutSideMenus = ref<RouteRecordRaw[]>([]);
    // 动态路由是否已生成
    const isDynamicRoutesGenerated = ref(false);

    const allCacheRoutes = ref<string[][]>([]);

    // 生成动态路由
    async function generateRoutes(): Promise<RouteRecordRaw[]> {
        try {
            const data = await MenuAPI.getRoutes();
            const dynamicRoutes = parseDynamicRoutes(data);
            routes.value = [...constantRoutes, ...dynamicRoutes];
            setAllCacheRoutes(routes.value);
            isDynamicRoutesGenerated.value = true;

            return dynamicRoutes;
        } catch (error) {
            console.error('X Failed to generate routes:', error);
            isDynamicRoutesGenerated.value = false;
            throw error;
        }

    }

    /**
     * 混合模式菜单下根据顶部菜单路径设置左侧菜单
     * @param topMenuPath 顶部菜单路径
     */
    const setMixLayoutSideMenus = (parentPath: string) => {
        const parentMenu = routes.value.find(item => item.path === parentPath);
        mixLayoutSideMenus.value = parentMenu?.children || [];
    }

    /**
     * 重置路由状态
     */
    const resetRouter = () => {
        // 移除动态路由
        const constantRouteNames = new Set(constantRoutes.map(route => route.name).filter(Boolean));
        routes.value.forEach(route => {
            if (route.name && !constantRouteNames.has(route.name)) {
                router.removeRoute(route.name);
            }
        });

        // 重置状态
        routes.value = [...constantRoutes];
        mixLayoutSideMenus.value = [];
        isDynamicRoutesGenerated.value = false;
    }

    /**
     * 获取所有的缓存路由
     * @param userRoutes 用户路由配置
     */
    const setAllCacheRoutes = (userRoutes: RouteRecordRaw[]) => {
        if (!userRoutes?.length) {
            allCacheRoutes.value = [];
            return;
        }

        const result: string[][] = [];
        userRoutes.forEach(route => {
            if (route.children?.length) {
                traverseRoute(route.children, [], result);
            }
        });
        allCacheRoutes.value = result;
    }

    return {
        routes,
        mixLayoutSideMenus,
        isDynamicRoutesGenerated,
        allCacheRoutes,
        setMixLayoutSideMenus,
        generateRoutes,
        resetRouter
    }
});

/**
 * 解析后端返回的路由数据并转换为vue router兼容的路由配置
 * @param rawRoutes 后端返回的原始路由数据
 * @returns 解析后的路由集合
 */
const parseDynamicRoutes = (rawRoutes: RouteVO[]): RouteRecordRaw[] => {
    const parseRoutes: RouteRecordRaw[] = [];

    rawRoutes.forEach(route => {
        const normalizedRoute = {} as RouteRecordRaw;

        // 处理组件路径
        normalizedRoute.component = normalizedRoute.component?.toString() === 'Layout'
        ? Layout : modules[`../../views/${normalizedRoute.component}.vue`] || modules[`../../views/error-page/404.vue`];

        // 递归处理子路由
        if (route.children) {
            normalizedRoute.children = parseDynamicRoutes(route.children);
        }
        parseRoutes.push(normalizedRoute);
    });
    return parseRoutes;
}

/**
 * 遍历路由树收集缓存路由
 * @param nodes 路由节点
 * @param path 当前路径
 * @param result 结果数组
 */
const traverseRoute = (nodes: RouteRecordRaw[], path: string[], result: string[][]) => {
    nodes.forEach(node => {
        const newPath: string[] = node.name ? [...path, String(node.name)] : [...path];

        // 叶子节点且需要缓存
        if (!node.children?.length && node.meta?.keepAlive) {
            result.push(newPath);
        }

        // 递归处理子节点
        if (node.children?.length) {
            traverseRoute(node.children, newPath, result);
        }
    });
}

/**
 * 在组件外使用Pinia store实例
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
    return usePermissionStore(store);
}