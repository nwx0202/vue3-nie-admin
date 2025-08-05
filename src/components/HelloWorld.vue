<script setup lang="ts">
import {useCounterStore} from '@/store/counter';
const counterStore = useCounterStore();
</script>

<template>
  <div>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>

    <el-button type="info"><svg-icon icon-class="kanrenao"/>SVG本地图标</el-button>
  </div>

  <el-card class="text-left text-white border-white border-1 border-solid mt-10 bg-[#242424]">
    <template #header>子组件 HelloWorld.vue</template>
    <el-form>
      <el-form-item label="数字: ">{{counterStore.count}}</el-form-item>
      <el-form-item label="加倍: ">{{counterStore.double}}</el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
