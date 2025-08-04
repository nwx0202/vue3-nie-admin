import vue from '@vitejs/plugin-vue';
import {type ConfigEnv, loadEnv, defineConfig} from 'vite';
import {resolve} from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      AutoImport({
        // 自动导入vue相关函数，如ref、reactive、toRef等
        imports: ['vue'],
        eslintrc: {
          // 是否自动生成eslint规则，建议生成之后设置false
          enabled: true,
          // 指定自动导入函数eslint规则的文件
          filepath: './.eslintrc-auto-import.json'
        },
        // 指定自动导入函数TS类型声明文件路径
        dts: resolve(resolve(__dirname, 'src'), 'types', 'auto-imports.d.ts'),
      }),
      Components({
        // 指定自动导入函数TS类型声明文件路径
        dts: resolve(resolve(__dirname, 'src'), 'types', 'components.d.ts'),
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src'),
      }
    }
  };
});