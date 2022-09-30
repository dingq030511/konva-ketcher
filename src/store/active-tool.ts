import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { ToolName, ToolType, ToolOpts } from '../types/tool.type';

export const useActiveToolStore = defineStore('activeTool', () => {
  const tool = reactive<ToolType>({
    name: 'select',
    opts: {
      type: 0,
    },
  });

  function selectTool(toolName: ToolName, opts: ToolOpts) {
    tool.name = toolName;
    tool.opts = opts;
  }
  return {
    tool,
    selectTool,
  };
});
