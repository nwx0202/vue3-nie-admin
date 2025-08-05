import vue from '@vitejs/plugin-vue';
import {type ConfigEnv, loadEnv, defineConfig} from 'vite';
import {resolve} from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        eslintrc: {
          // 是否自动生成eslint规则，建议生成之后设置false
          enabled: true,
          // 指定自动导入函数eslint规则的文件
          filepath: './.eslintrc-auto-import.json'
        },
        resolvers: [
          // 自动导入element plus相关函数，如ElMessage、ElMessageBox
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver()
        ],
        // 是否在vue模板中自动导入
        vueTemplate: true,
        // 指定自动导入函数TS类型声明文件路径
        dts: resolve(resolve(__dirname, 'src'), 'types', 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // element-plus图标库，其他图标库https://icon-sets.iconify.design/
            enabledCollections: ['ep']
          })
        ],
        // 指定自动导入函数TS类型声明文件路径
        dts: resolve(resolve(__dirname, 'src'), 'types', 'components.d.ts'),
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symboled格式
        symbolId: 'icon-[dir]-[name]'
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src'),
      }
    }
  };
});