<template>
  <el-config-provider :locale="locale" :size="size">
    <el-watermark
      :font="{color: fontColor}"
      :content="showWatermark ? defaultSettings.watermarkContent : ''"
      :z-index="9999"
      class="wh-full">
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ComponentSize } from './enums/LayoutEnum';
import { ThemeMode } from './enums/ThemeEnum';
import { useAppStore } from './store/modules/app';
import { useSettingsStore } from './store/modules/settings';
import { defaultSettings } from './settings';

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const locale = computed(() => appStore.locale);
const size = computed(() => appStore.size as ComponentSize);
const showWatermark = computed(() => settingsStore.showWatermark);

// 明亮/暗黑主题水印字体颜色配置
const fontColor = computed(() => {
  return settingsStore.theme === ThemeMode.DARK ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
});
</script>

<style scoped>

</style>
