<template>
  <div ref="container" class="editor-container">
    <Editor :container="container" />
  </div>
</template>

<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { ref } from 'vue';
  import Editor from './Editor.vue';
  const container = ref<HTMLDivElement>();
</script>

<style lang="less">
  .editor-container {
    width: 800px;
    height: 600px;
    margin: 100px auto;
    display: flex;
    > div {
      flex: 1;
    }
  }
</style>
