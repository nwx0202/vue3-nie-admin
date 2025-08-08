import { DeviceEnum } from "@/enums/DeviceEnum";
import { SideBarStatus } from "@/enums/LayoutEnum";
import { SidebarStatusEnum } from "@/enums/SidebarStatusEnum";
import {defaultSettings} from "@/settings";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { defineStore } from "pinia";

export const useAppStore = defineStore('app', () => {
    // 设备类型
    const device = useStorage('device', DeviceEnum.DESKTOP);
    // 布局大小
    const size = useStorage('size', defaultSettings.size);
    // 语言
    const language = useStorage('language', defaultSettings.language);
    // 侧边栏状态
    const sidebarStatus = useStorage('sidebarStatus', SidebarStatusEnum.CLOSED);
    const sidebar = reactive({
        opened: sidebarStatus.value === SideBarStatus.OPENED,
        withoutAnimation: false,
    });

    // 顶部菜单激活路径
    const activeTopMenuPath = useStorage('activeTopMenuPath', '');

    // 根据语言标识读取对应的语言包
    const locale = computed(() => {
        if (language?.value === 'en') {
            return en;
        } else {
            return zhCn;
        }
    });

    // 切换侧边栏
    function toggleSidebar() {
        sidebar.opened = false;
        sidebarStatus.value = sidebar.opened ? SideBarStatus.OPENED : SideBarStatus.CLOSED;
    }

    // 关闭侧边栏
    function closeSidebar() {
        sidebar.opened = false;
        sidebarStatus.value = SideBarStatus.CLOSED;
    }

    // 打开侧边栏
    function openSidebar() {
        sidebar.opened = true;
        sidebarStatus.value = SideBarStatus.OPENED;
    }

    // 切换设备
    function toggleDevice(val: string) {
        device.value = val;
    }

    // 改变布局大小
    function changeSize(val: string) {
        size.value = val;
    }

    // 切换语言
    function changeLanguage(val: string) {
        language.value = val;
    }

    // 混合模式顶部切换
    function activeTopMenu(val: string) {
        activeTopMenuPath.value = val;
    }

    return {
        device,
        sidebar,
        language,
        locale,
        size,
        activeTopMenuPath,
        activeTopMenu,
        toggleDevice,
        changeLanguage,
        changeSize,
        closeSidebar,
        openSidebar,
        toggleSidebar
    }
});