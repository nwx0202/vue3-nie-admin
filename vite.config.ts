import vue from '@vitejs/plugin-vue';
import {type ConfigEnv, loadEnv, defineConfig, UserConfig, PluginOption} from 'vite';
import {resolve} from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import UnoCSS from 'unocss/vite';

import { name, version, engines, dependencies, devDependencies } from './package.json';
import { tr } from 'element-plus/es/locales.mjs';

const __APP_INFO__ = {
  pkg: {name, version, engines, dependencies, devDependencies},
  buildTimestamp: Date.now()
};

export default defineConfig(({mode}: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'production';

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/variables.scss' as *;`
        }
      },
    },
    server: {
      host: '0.0.0.0',
      port: +env.VITE_APP_PORT,
      open: true,
      // 反向代理解决跨域
      proxy: {
        // 代理/dev-api的请求
        [env.VITE_APP_BASE_API]: {
          // 代理目标地址http://vapi.youlai.tech
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        // 导入vue相关函数，如ref、reactive、toRefs等
        imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
        resolvers: [
          // 自动导入element plus相关函数，如ElMessage、ElMessageBox
          ElementPlusResolver({importStyle: 'sass'}),
        ],
        eslintrc: {
          // 是否自动生成eslint规则，建议生成之后设置false
          enabled: false,
          // 指定自动导入函数eslint规则的文件
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        // 是否在vue模板中自动导入
        vueTemplate: true,
        // 指定自动导入函数TS类型声明文件路径
        // dts: false
        dts: resolve(resolve(__dirname, 'src'), 'types', 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver({importStyle: 'sass'}),
        ],
        // 指定自定义组件位置
        dirs: ['src/components', 'src/**/components'],
        // 指定自动导入函数TS类型声明文件路径
        // dts: false
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
    ] as PluginOption[],
    // 预加载项目必须的组件
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'element-plus',
        'pinia',
        'axios',
        '@vueuse/core',
        'codemirror-editor-vue3',
        'default-passive-events',
        'exceljs',
        'path-to-regexp',
        'echarts/core',
        'echarts/renderers',
        'echarts/charts',
        'echarts/components',
        'vue-i18n',
        'nprogress',
        'sortablejs',
        'qs',
        'path-browserify',
        '@stomp/stompjs',
        '@element-plus/icons-vue',
        'element-plus/es',
        'element-plus/es/locale/lang/en',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/components/alert/style/index',
        'element-plus/es/components/avatar/style/index',
        'element-plus/es/components/backtop/style/index',
        'element-plus/es/components/badge/style/index',
        'element-plus/es/components/base/style/index',
        'element-plus/es/components/breadcrumb-item/style/index',
        'element-plus/es/components/breadcrumb/style/index',
        'element-plus/es/components/button/style/index',
        'element-plus/es/components/card/style/index',
        'element-plus/es/components/cascader/style/index',
        'element-plus/es/components/checkbox-group/style/index',
        'element-plus/es/components/checkbox/style/index',
        'element-plus/es/components/col/style/index',
        'element-plus/es/components/color-picker/style/index',
        'element-plus/es/components/config-provider/style/index',
        'element-plus/es/components/date-picker/style/index',
        'element-plus/es/components/descriptions-item/style/index',
        'element-plus/es/components/descriptions/style/index',
        'element-plus/es/components/dialog/style/index',
        'element-plus/es/components/divider/style/index',
        'element-plus/es/components/drawer/style/index',
        'element-plus/es/components/dropdown-item/style/index',
        'element-plus/es/components/dropdown-menu/style/index',
        'element-plus/es/components/dropdown/style/index',
        'element-plus/es/components/empty/style/index',
        'element-plus/es/components/form-item/style/index',
        'element-plus/es/components/form/style/index',
        'element-plus/es/components/icon/style/index',
        'element-plus/es/components/image-viewer/style/index',
        'element-plus/es/components/image/style/index',
        'element-plus/es/components/input-number/style/index',
        'element-plus/es/components/input-tag/style/index',
        'element-plus/es/components/input/style/index',
        'element-plus/es/components/link/style/index',
        'element-plus/es/components/loading/style/index',
        'element-plus/es/components/menu-item/style/index',
        'element-plus/es/components/menu/style/index',
        'element-plus/es/components/message-box/style/index',
        'element-plus/es/components/message/style/index',
        'element-plus/es/components/notification/style/index',
        'element-plus/es/components/option/style/index',
        'element-plus/es/components/pagination/style/index',
        'element-plus/es/components/popover/style/index',
        'element-plus/es/components/progress/style/index',
        'element-plus/es/components/radio-button/style/index',
        'element-plus/es/components/radio-group/style/index',
        'element-plus/es/components/radio/style/index',
        'element-plus/es/components/row/style/index',
        'element-plus/es/components/scrollbar/style/index',
        'element-plus/es/components/select/style/index',
        'element-plus/es/components/skeleton-item/style/index',
        'element-plus/es/components/skeleton/style/index',
        'element-plus/es/components/step/style/index',
        'element-plus/es/components/steps/style/index',
        'element-plus/es/components/sub-menu/style/index',
        'element-plus/es/components/switch/style/index',
        'element-plus/es/components/tab-pane/style/index',
        'element-plus/es/components/table-column/style/index',
        'element-plus/es/components/table/style/index',
        'element-plus/es/components/tabs/style/index',
        'element-plus/es/components/tag/style/index',
        'element-plus/es/components/text/style/index',
        'element-plus/es/components/time-picker/style/index',
        'element-plus/es/components/time-select/style/index',
        'element-plus/es/components/timeline-item/style/index',
        'element-plus/es/components/timeline/style/index',
        'element-plus/es/components/tooltip/style/index',
        'element-plus/es/components/tree-select/style/index',
        'element-plus/es/components/tree/style/index',
        'element-plus/es/components/upload/style/index',
        'element-plus/es/components/watermark/style/index',
      ]
    },
    build: {
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 只在生产环境启用压缩
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ?
      {
        compress: {
          // 防止infinity被压缩成1/0，这可能会导致Chrome上的性能问题
          keep_infinity: true,
          // 生产环境去除console.log、console.warn、console.error等
          drop_console:true,
          // 生产环境去除debugger
          drop_debugger: true,
          // 移除指定的函数调用
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false
        },
      } : {},
      rollupOptions: {
        output: {
          // 用于从入口点创建的快的打包输出格式[name]表示文件，[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name);
            if (/\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts';
            }
            return `${extType}/[name].[hash].[ext]`;
          }
        }
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    }
  };
});