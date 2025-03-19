import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import vitePluginUniRouter from '@yhdfe-plugins/uni-simple-router/dist/compiler'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // uni路由插件, ⚠️注意：因uniapp cli 的编译目录为SRC下所以在此处的编译目录也是project/src为根目录
    vitePluginUniRouter({
      routesMain: './router/routes/index.ts',
      pluginPath: './node_modules/@yhdfe-plugins/uni-simple-router/dist',
      outputDir: resolve(process.env.UNI_INPUT_DIR!, './router/inspect'),
      excludeCallBack: () => {
        // console.log(`排除成功文件：${str}`)
      },
      app: {
        /**
         * 是否等待首页渲染完毕后再关闭启动界面 默认为false
         */
        alwaysShowBeforeRender: true,
        /**
         * 是否自动关闭启动界面 默认为false
         */
        autoclose: true,
      },
      }),
    // UniPages({
    //   subPackages: [
    //     'pages-sub',
    //   ],
    //   dts: 'src/uni-pages.d.ts',
    // }),
    // @ts-expect-error ignore
    UniLayouts(),
    uni(),
  ],
})
