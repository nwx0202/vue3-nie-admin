import request from '@/utils/request';

const MENU_BASE_URL = '/api/v1/menus';

const MenuAPI = {
    /**
     * 获取当前用户的路由列表
     * 无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
     */
    getRoutes() {
        return request<any, RouteVO[]>({
            url: `${MENU_BASE_URL}/routes`,
            method: 'get'
        });
    },

    /**
     * 获取树形菜单列表
     * @return 菜单树形列表
     */
    getMaxListeners(queryParam: MenuQuery) {
        return request<any, MenuVO[]>({
            url: `${MENU_BASE_URL}`,
            method: 'get',
            params: queryParam
        });
    },

    /**
     * 获取菜单下拉数据源
     * @return 菜单下拉数据源
     */
    // getOptions(onlyParent?: boolean) {
    //     return request<any, OptionType[]>({
    //         url: `${MENU_BASE_URL}/options`,
    //         method: 'get',
    //         params: {onlyParent}
    //     });
    // },

    /**
     * 获取菜单表单数据
     * @param id 菜单id
     */
    getFormData(id: string) {
        return request<any, MenuForm>({
            url: `${MENU_BASE_URL}/${id}/form`,
            method: 'get'
        });
    },

    /**
     * 添加菜单
     * @param data 菜单表单数据
     * @return 请求结果
     */
    create(data: MenuForm) {
        return request({
            url: `${MENU_BASE_URL}`,
            method: 'post',
            data
        });
    },

    /**
     * 修改菜单
     * @param id 菜单ID
     * @param data 菜单表单数据
     * @return 请求结果
     */
    update(id: string, data: MenuForm) {
        return request({
            url: `${MENU_BASE_URL}/${id}`,
            method: 'put',
            data
        });
    },

    /**
     * 删除菜单
     * @param id 菜单ID
     * @return 请求结果
     */
    deleteById(id: string) {
        return request({
            url: `${MENU_BASE_URL}/${id}`,
            method: 'delete'
        });
    }
};

export default MenuAPI;

import type {MenuTypeEnum} from '@/enums/system/menu.enum';

/** 菜单查询参数 */
export interface MenuQuery {
    keywords?: string
}

/** 菜单视图对象 */
export interface MenuVO {
    /** 子菜单 */
    children?: MenuVO[],
    /** 组件路径 */
    component?: string,
    /** ICON */
    icon?: string,
    /** 菜单ID */
    id?: string,
    /** 菜单名称 */
    name?: string,
    /** 父菜单ID */
    parentId?: string,
    /** 按钮权限标识 */
    perm?: string,
    /** 跳转路径 */
    redirect?: string,
    /** 路由名称 */
    routeName?: string,
    /** 路由相对路径 */
    routePath?: string,
    /** 菜单排序，数字越小排名越靠前 */
    sort?: number,
    /** 菜单类型 */
    type?: MenuTypeEnum,
    /** 菜单是否可见，1显示，0隐藏 */
    visible?: number
}

/** 菜单表单对象 */
export interface MenuForm {
    /** 菜单ID */
    id?: string,
    /** 父菜单ID */
    parentId?: string,
    /** 菜单名称 */
    name?: string,
    /** 菜单是否可见，1显示，0隐藏 */
    visible?: number,
    /** ICON */
    icon?: string,
    /** 菜单排序，数字越小排名越靠前 */
    sort?: number,
    /** 路由名称 */
    routeName?: string,
    /** 路由相对路径 */
    routePath?: string,
    /** 组件路径 */
    component?: string,
    /** 跳转路径 */
    redirect?: string,
    /** 菜单类型 */
    type?: MenuTypeEnum,
    /** 按钮权限标识 */
    perm?: string,
    /** 是否开启页面缓存 */
    keepAlive?: number,
    /** 只有一个子路由是否始终显示 */
    alwaysShow?: number,
    /** 参数 */
    params?: KeyValue[]
}

interface KeyValue {
    key: string,
    value: string
}

/** RouteVO，路由对象 */
export interface RouteVO {
    /** 子路由列表 */
    children?: RouteVO[],
    /** 组件路径 */
    component?: string,
    /** 路由属性 */
    meta?: Meta,
    /** 路由名称 */
    name?: string,
    /** 路由路径 */
    path?: string,
    /** 跳转路径 */
    redirect?: string
}

/** Meta，路由属性 */
interface Meta{
    /** 只有一个子路由时是否始终显示 */
    alwaysShow?: boolean,
    /** 是否隐藏，true是，false否 */
    hidden?: boolean,
    /** ICON */
    icon?: string,
    /** 是否开启页面缓存 */
    keepAlive?: boolean,
    /** 路由title */
    title?: string
}
