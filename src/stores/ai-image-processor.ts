// src/stores/ai-image-processor.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface ProcessingResult {
  title?: string;
  description?: string;
  albumCategory?: string;
  // 添加其他可能的结果字段
}

export const useAIImageProcessorStore = defineStore('aiImageProcessor', () => {
  const treeData = ref<TreeNode[]>([]);
  const selectedItems = ref<string[]>([]);
  const processingResult = ref<ProcessingResult | null>(null);

  const setTreeData = (data: TreeNode[]) => {
    treeData.value = data;
  };

  const setSelectedItems = (items: string[]) => {
    selectedItems.value = items;
  };

  const setProcessingResult = (result: ProcessingResult) => {
    processingResult.value = result;
  };

  const fetchTreeData = async (dataSource: string) => {
    try {
      const response = await api.get<TreeNode[]>(`/tree-data/${dataSource}`);
      setTreeData(response.data);
    } catch (error) {
      console.error('Failed to fetch tree data:', error);
      throw error;
    }
  };

  return {
    treeData,
    selectedItems,
    processingResult,
    setTreeData,
    setSelectedItems,
    setProcessingResult,
    fetchTreeData,
  };
});
