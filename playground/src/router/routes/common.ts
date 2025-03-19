import { __dynamicImportComponent__ } from '@yhdfe-plugins/uni-simple-router'
import type { RouteRecordBaseRule } from '@yhdfe-plugins/uni-simple-router'

export const commons: RouteRecordBaseRule[] = [
  {
    path: '/',
    // pagesPath: '/pages/login/index',
    // aliasPath: '/pages/login/index',
    name: 'home',
    component: __dynamicImportComponent__(`@/pages/index/index.vue`, {
      pageType: 'top',
      layout: 'default',
      style: {
        // #ifdef APP-PLUS || H5
        navigationStyle: 'custom',
        // #endif
        // #ifdef MP-ALIPAY
        navigationBarTitleText: '登陆',
        navigationBarBackgroundColor: '#13C2C2',
        titleColor: '#ffffff',
        // #endif
      },
    }),
    meta: {
      // 导航栏标题
      title: '登陆',
      // 导航栏
      navigationBarColor: '#13C2C2',
      // 是否需要认证
      requiresAuth: false,
    },
  },
  {
    path: `/pages/index/disabled`,
    name: `page`,
    component: __dynamicImportComponent__(`@/pages/index/disabled.vue`, {
      pageType: 'top',
      layout: 'default',
      // package: {
      //   type: `child`, //启用分包
      //   name: 'pages/devtool',
      // },
      style: {
        // #ifdef APP-PLUS || H5
        navigationStyle: 'custom',
        // #endif
        // #ifdef MP-ALIPAY
        navigationBarTitleText: '调试页面',
        navigationBarBackgroundColor: '#13C2C2',
        titleColor: '#ffffff',
        // #endif
      },
    }),
    meta: {
      // #ifdef H5
      customNavigationBar: true,
      // #endif
      title: '调试页面',
      // 是否需要认证
      requiresAuth: false,
      // 导航栏
      navigationBarColor: '#13C2C2',
    },
  },
  {
    path: `/pages/index/uni-layout`,
    name: `uni-layout`,
    component: __dynamicImportComponent__(`@/pages/index/uni-layout.vue`, {
      pageType: 'top',
      // package: {
      //   type: `child`, //启用分包
      //   name: 'pages/common',
      // },
      style: {
        // #ifdef APP-PLUS || H5
        navigationStyle: 'custom',
        // #endif
        // #ifdef MP-ALIPAY
        navigationBarTitleText: '调试页面',
        navigationBarBackgroundColor: '#13C2C2',
        titleColor: '#ffffff',
        // #endif
      },
    }),
    meta: {
      // #ifdef H5
      customNavigationBar: true,
      // #endif
      title: '找不到页面',
      // 导航栏
      navigationBarColor: '#13C2C2',
      // 是否需要认证
      requiresAuth: false,
    },
  },
  {
    path: '/pages/test/index',
    // pagesPath: '/pages/login/index',
    // aliasPath: '/pages/login/index',
    name: 'test',
    component: __dynamicImportComponent__(`@/pages/test/index.vue`, {
      pageType: 'top',
      // @ts-ignore
      layout: "default",
      style: {
        // #ifdef APP-PLUS || H5
        navigationStyle: 'custom',
        // #endif
        // #ifdef MP-ALIPAY
        navigationBarTitleText: '登陆',
        navigationBarBackgroundColor: '#13C2C2',
        titleColor: '#ffffff',
        // #endif
      },
    }),
    meta: {
      // 导航栏标题
      title: '登陆',
      // 导航栏
      navigationBarColor: '#13C2C2',
      // 是否需要认证
      requiresAuth: false,
    },
  },
]
