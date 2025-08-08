import { ThemeMode } from "@/enums/ThemeEnum";

declare global {
    interface ResponseData<T = any> {
        code: string;
        data: T;
        msg: string
    }

    interface PageQuery {
        pageNum: number;
        pageSize: number
    }

    interface PageResult<T> {
        list: T;
        total: number
    }

    interface TagView {
        /** 页签名称 */
        name: string;
        /** 页签标题 */
        title: string;
        /** 页签路由路径 */
        path: string;
        /** 页签路由完整路径 */
        fullPath: string;
        /** 页签图标 */
        icon?: string,
        /** 是否固定页签 */
        affix?: boolean;
        /** 是否开启缓存 */
        keepAlive?: boolean;
        /** 路由查询参数 */
        query?: any
    }

    /**
     * 系统设置
     */
    interface AppSettings {
        /** 系统标题 */
        title: string;
        /** 系统版本 */
        version: string;
        /** 是否显示设置 */
        showSettings: boolean;
        /** 是否固定头部 */
        // fixedHeader: boolean;
        /** 是否显示多标签导航 */
        showTagsView: boolean;
        /** 是否显示应用logo */
        showAppLogo: boolean;
        /** 是否显示侧边栏logo */
        // sidebarLogo: boolean;
        /** 侧边栏配色方案 */
        sidebarColorScheme: string,
        /** 导航栏布局left|top|mix */
        layout: string;
        /** 主题颜色 */
        themeColor: string;
        /** 主题模式dark|light */
        theme: ThemeMode;
        /** 布局大小default|small|large */
        size: string;
        /** 系统语言zh-cn|en */
        language: string;
        /** 是否开启水印 */
        showWatermark: boolean;
        /** 水印内容 */
        watermarkContent: string
    }

    /**
     * 组件数据源
     */
    interface OptionType {
        value: string | number;
        label: string;
        children?: OptionType[];
    }
}

export {};