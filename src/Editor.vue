<template>
  <v-stage ref="stageRef" :config="stageConfig" @click="stageClick">
    <v-layer>
      <v-circle @click="circleClick" :config="circleConfig"></v-circle>
    </v-layer>
    <v-layer ref="layer2">
      <v-rect :config="rect"></v-rect>
    </v-layer>
  </v-stage>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watchEffect } from 'vue';
  import Konva from 'konva';
  import type { StageConfig } from 'konva/lib/Stage';
  import type { CircleConfig } from 'konva/lib/shapes/Circle';
  import type { RectConfig } from 'konva/lib/shapes/Rect';
  import type { KonvaEventObject } from 'konva/lib/Node';
  import { useActiveToolStore } from './store/active-tool';
  const stageRef = ref<Konva.Stage>();
  let stage!: Konva.Stage;
  const props = defineProps({
    container: HTMLDivElement,
  });
  const activeToolStore = useActiveToolStore();
  activeToolStore.selectTool('atom', {
    type: 0,
    label: 'C',
  });

  const layer2 = ref<Konva.Layer>();
  const stageConfig = reactive<StageConfig>({} as StageConfig);
  const circleConfig = reactive<CircleConfig>({
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 1,
  });
  const rect = reactive<RectConfig>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 1,
  });
  onMounted(() => {
    stage = stageRef.value!.getStage();
  });
  watchEffect(() => {
    if (props.container) {
      stageConfig.width = props.container.clientWidth;
      stageConfig.height = props.container.clientHeight;
      circleConfig.x = stageConfig.width / 2;
      circleConfig.y = stageConfig.height / 2;
    }
  });
  function stageClick(event: KonvaEventObject<MouseEvent>) {
    console.log(event);
    console.log(stage.getPointerPosition());
  }
  function circleClick(event: KonvaEventObject<MouseEvent>) {
    console.log('circle click', event);
    event.cancelBubble = true;
    console.log(stage.getPointerPosition());
  }
</script>

<style lang="less">
  .editor-stage {
    width: 100%;
  }
</style>
