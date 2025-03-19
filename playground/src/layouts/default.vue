<template>
  <wd-config-provider
    class="min-w-screen min-h-screen page-wrapper"
    :theme="currentTheme"
    :theme-vars="themeVars"
  >
    <!-- #ifdef APP-PLUS || H5 -->
    <wd-navbar
      v-if="state.titleVisible"
      :title="state.navTitle"
      :left-arrow="state.backVisible"
      fixed
      safe-area-inset-top
      :custom-style="
        (state.navigationBarColor ? `background-color: ${state.navigationBarColor};` : ``) +
        (state.navigationBarTextColor
          ? `--wot-navbar-color: ${state.navigationBarTextColor}; --wot-navbar-desc-font-color: ${state.navigationBarTextColor}`
          : '')
      "
      @click-left="handleClickLeft"
    />
    <!-- #endif -->

    <wd-notify />
    <wd-toast />
    <wd-message-box />

    <wd-message-box v-if="state.confirmBack" selector="confirm-back-message-box">
      <view class="flex justify-center items-center flex-col">
        <view>退出后将不进行保存单据信息,</view>
        <view>请确认是否退出？</view>
      </view>
    </wd-message-box>

    <view
      class="pages"
      :style="
        state.titleVisible
          ? { top: 'calc(env(safe-area-inset-top) + var(--wot-navbar-height, 44px))' }
          : {}
      "
    >
      <slot></slot>
    </view>
  </wd-config-provider>
</template>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script lang="ts" setup>
import { ConfigProviderTheme } from 'wot-design-uni/components/wd-config-provider/types'
// import { PageWrapperProps } from './type'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from '@yhdfe-plugins/uni-simple-router'
import { useMessage } from 'wot-design-uni'
// 消息提示
const message = useMessage('confirm-back-message-box')

const currentTheme = ref<ConfigProviderTheme>('light')

// 路由
const route = useRoute()

// 自定义导航栏
const state = reactive({
  navTitle: '', // 自定义导航栏头部名称
  titleVisible: true, // 自定义导航栏头部展示
  backVisible: true, //是否展示返回
  confirmBack: false, //确认是否回退
  navigationBarColor: '', //自定义导航栏颜色
  navigationBarTextColor: '', //自定义导航栏标题颜色
})

// 加载导航栏
const loadNav = () => {
  state.navTitle = (route.value.meta.title as string) ?? ''
  state.navigationBarColor = (route.value.meta.navigationBarColor as string) ?? ''
  state.navigationBarTextColor = (route.value.meta.navigationBarTextColor as string) ?? ''
  // state.titleVisible = ((route.value.meta.customNavigationBar as boolean) && !isDingTalk()) ?? false
  state.confirmBack = (route.value.meta.confirmBack as boolean) ?? false
  state.backVisible = getCurrentPages().length > 1
}

// 挂载后默认更改当前原生主题
onMounted(() => {
  // 检查版本更新
  // uploadRef?.value.checkAppUpdate()
  // 处理路由比loadNav后更新的问题
  nextTick(() => loadNav())
})

const themeVars = reactive({
  // colorTheme: '#13c2c2',
})

const handleClickLeft = () => {
  // #ifdef APP-PLUS || H5

  if (state.confirmBack) {
    message
      .confirm({
        msg: `退出后将不进行保存单据信息，
        请确认是否退出？`,
      })
      .then(() => {
        uni.navigateBack()
        console.log('点击了确定按钮')
      })
      .catch(() => {
        console.log('点击了取消按钮')
      })
  } else {
    uni.navigateBack()
  }

  // #endif
}

// function onMounted (arg0: () => void) {
//   throw new Error('Function not implemented.')
// }
</script>
<!-- 
<style lang="scss">
.page-wrapper {
  overflow: hidden;
  background-color: $background-color;
}

.pages {
  position: relative;
  inset: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
  margin-bottom: env(safe-area-inset-bottom);
  overflow: hidden;
}
</style> -->
