import {
  RouteLocationRaw,
  createRouter,
  platformRule,
  toIsNewWindow,
} from '@yhdfe-plugins/uni-simple-router'
import { routes } from './routes'

/**
 * @description 退出APP
 */
function androidQuitApp() {
  uni.showModal({
    title: '退出应用',
    content: `你确定要退出本应用？`,
    success: ({ confirm }) => {
      confirm && plus.runtime.quit()
    },
  })
}

/**
 * 是否开启随机动画
 */
const randomAnimation = false

const router = createRouter({
  platform: 'h5',
  // hotRefresh:{
  // 	mode:process.env.NODE_ENV,
  // 	to:`/?id=6666`,
  // 	navType: process.env.VUE_APP_PLATFORM.includes(`mp-`) ? `pushTab` : `replaceAll`
  // },
  routeNotFound: () => {
    return {
      name: `404`,
      navType: `push`,
    }
  },
  // 其他配置...
  navigateLock: {
    // 默认配置即是如下，无需二次配置
    autoUnlock: [0, 1, 3, 4, 5, 6, 7, 8, 9],
  },
  applet: {
    launchedHook: () => {
      console.log(`首页进入成功`)
    },
    hideHomeButton: true,
  },
  app: {
    setSideSlipGesture: () => {
      return `close`
    },
    launchedHook() {
      console.log('app 启动成功')
    },
    runtimeQuit: androidQuitApp,
  },
  h5: {
    animation: {
      includeNavtype: [`push`, `back`, `replace`],
      animationTime: 0.3,
      animationAppEl: (to, from) => {
        if (toIsNewWindow(to, from)) {
          return document.querySelector(`#app`)
        }
        if (to.meta && to?.meta?.animationEl && to?.meta?.navType === to.navType) {
          return document.querySelector(to.meta.animationEl as string)
        }
        return null
      },
      defaultAnimationType: (to) => {
        let animationType = `animate__slideInRight`
        if (randomAnimation) {
          const animationNode = [
            `animate__slideInRight`,
            `animate__bounceInRight`,
            `animate__rotateInDownLeft`,
            `animate__zoomInDown`,
          ]
          animationType = animationNode[parseInt((Math.random() * animationNode.length).toString())]
        }
        if (to?.meta?.animation && to?.meta?.navType === to.navType) {
          animationType = to.meta.animation as string
        }
        return animationType
      },
      animationNodeMap: {
        // eslint-disable-next-line camelcase
        animate__slideInRight: [
          // 前进
          [`animate__slideInRight`, `animate__slideOutLeft`],
          // 后退
          [`animate__slideInLeft`, `animate__slideOutRight`],
        ],
        // eslint-disable-next-line camelcase
        animate__bounceInRight: [
          // 前进
          [`animate__bounceInRight`, `animate__bounceOutLeft`],
          // 后退
          [`animate__bounceInLeft`, `animate__bounceOutRight`],
        ],
        // eslint-disable-next-line camelcase
        animate__rotateInDownLeft: [
          // 前进
          [`animate__rotateInDownLeft`, `animate__rotateOutDownLeft`],
          // 后退
          [`animate__rotateInDownRight`, `animate__rotateOutDownRight`],
        ],
        // eslint-disable-next-line camelcase
        animate__zoomInDown: [
          // 前进
          [`animate__zoomInDown`, `animate__zoomOutDown`],
          // 后退
          [`animate__zoomInUp`, `animate__zoomOutDown`],
        ],
        // 给路由定义的动画
        // eslint-disable-next-line camelcase
        child_router_animate: [
          // 前进
          // @ts-ignore
          [`animate__slideInUp`],
        ],
      },
    },
  },
  routes,
})

let appRunCount = 0
router.beforeEach(async (to) => {
})

router.afterEach(async (to) => {})

export default router
