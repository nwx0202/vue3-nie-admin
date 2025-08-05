<script setup lang="ts">
import { ref } from 'vue';
import variables from '@/styles/variables.module.scss';

console.log(variables.bgColor);

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>

    <el-button type="info"><svg-icon icon-class="kanrenao"/>SVG本地图标</el-button>
  </div>

  <div style="width: 100px; height: 100px;" :style="{'background-color': variables.bgColor}"></div>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
