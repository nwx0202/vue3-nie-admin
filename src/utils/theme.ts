import { ThemeMode } from "@/enums/ThemeEnum";

// 将十六进制颜色转为RGB
function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// 将RGB转为十六进制颜色
function rgbToHex(r: number, g:number, b:number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * 加深颜色
 * @param {string} color 颜色值字符串
 * @param {number} level 加深的程度，限0-1之间
 * @return {string} 返回处理后的颜色
 */
export const getDarkColor = (color: string, level: number): string => {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
    }
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * 变浅颜色
 * @param {string} color 颜色值字符串
 * @param {number} level 变浅的程度，限0-1之间
 * @return {string} 返回处理后的颜色值
 */
export const getLightColor = (color: string, level: number): string => {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
    }
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * 生成主题颜色
 * @param primary 主题色
 * @param theme 主题类型
 */
export function generateThemeColor(primary: string, theme: ThemeMode) {
    const colors: Record<string, string> = {primary};

    // 生成浅色变体
    for (let i = 0; i <= 9; i++) {
        colors[`primary-light-${i}`] = theme === ThemeMode.LIGHT
            ? `${getLightColor(primary, i / 10)}` : `${getDarkColor(primary, i / 10)}`;
    }

    // 生成深色变体
    colors['primary-dark-2'] = theme === ThemeMode.LIGHT ?
        `${getLightColor(primary, 0.2)}` : `${getDarkColor(primary, 0.3)}`;

    return colors;
}

export function applyTheme(colors: Record<string, string>) {
    const el = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
        el.style.setProperty(`--el-color-${key}`, value);
    });

    // 确保主题色立即生效，强制重新渲染
    requestAnimationFrame(() => {
        el.style.setProperty('--theme-update-trigger', Date.now().toString());
    });
}

/**
 * 切换暗黑模式
 * @param isDark 是否启用暗黑模式
 */
export function toggleDarkMode(isDark: boolean) {
    if (isDark) {
        document.documentElement.classList.add(ThemeMode.DARK);
    } else {
        document.documentElement.classList.remove(ThemeMode.DARK);
    }
}

/**
 * 切换浅色主题下的侧边栏颜色方案
 * @param isBlue 布尔值，表示是否开启深蓝色侧边栏颜色方案
 */
export function toggleSidebarColor(isBlueSidebar: boolean) {
    if (isBlueSidebar) {
        document.documentElement.classList.add('sidebar-color-blue');
    } else {
        document.documentElement.classList.remove('sidebar-color-blue');
    }
}
