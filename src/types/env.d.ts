// TypeScript 类型提示都为 string： https://github.com/vitejs/vite/issues/6930
interface ImportMetaEnv {
    VITE_APP_TITLE: string,
    VITE_APP_PORT: number,
    VITE_APP_BASE_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// 平台的名称、版本、运行所需的node版本、一来、构建时间的类型提示
declare const __APP_INFO__: {
    pkg: {
        name: string,
        version: string,
        engines: {
            node: string,
        },
        dependencies: Record<string, string>,
        devDependencies: Record<string, string>
    };
    buildTimestamp: number;
};