<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useAIImageProcessorStore } from 'src/stores/ai-image-processor';
import { processImages } from 'src/api/aiService';

const $q = useQuasar();
const store = useAIImageProcessorStore();

// 数据源选择
const dataSourceOptions = ['文件目录', '日期', '品牌', '机构', '相册'];
const selectedDataSource = ref('');

// 树形数据
const treeData = computed(() => store.treeData);

// 选中的文件或节点
const selectedItems = computed({
  get: () => store.selectedItems,
  set: (value) => store.setSelectedItems(value),
});

// AI处理类型
const aiProcessTypes = ['标题', '图片描述', '相册'];
const selectedAIType = ref('');

// 标题长度限制
const titleLengthLimit = ref(8);

// 相册归纳范围
const albumCategories = ['人物', '风景', '美食', '动物', '其他'];
const selectedAlbumCategory = ref('');

// 计算属性：是否可以提交
const canSubmit = computed(() => {
  return selectedItems.value.length > 0 && selectedAIType.value !== '';
});

// 获取树形数据
const fetchTreeData = async () => {
  // 这里应该根据selectedDataSource的值来调用不同的API
  // 为简化示例，我们使用一个模拟的树形数据
  await store.fetchTreeData(selectedDataSource.value);
};

// 处理数据源变化
const handleDataSourceChange = (value: string) => {
  selectedDataSource.value = value;
  selectedItems.value = [];
  fetchTreeData();
};

// 处理AI类型变化
const handleAITypeChange = (value: string) => {
  selectedAIType.value = value;
  if (value === '相册') {
    selectedAlbumCategory.value = '';
  }
};

// 提交处理
const submitProcessing = async () => {
  if (!canSubmit.value) {
    $q.dialog({
      title: '提示',
      message:
        selectedItems.value.length === 0
          ? '请选择文件或节点'
          : '请选择AI处理类型',
    });
    return;
  }

  try {
    $q.loading.show();
    const params = {
      items: selectedItems.value,
      aiType: selectedAIType.value,
      titleLengthLimit: titleLengthLimit.value,
      albumCategory: selectedAlbumCategory.value,
    };
    const result = await processImages(params);
    store.setProcessingResult(result);
    $q.notify({
      color: 'positive',
      message: '处理成功',
      icon: 'check',
    });
    // 这里可以添加显示结果的逻辑
  } catch (error) {
    console.error(error);
    $q.notify({
      color: 'negative',
      message: '处理失败，请重试',
      icon: 'report_problem',
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-mb-md">AI图片处理器</h1>

    <q-form @submit="submitProcessing">
      <q-select
        v-model="selectedDataSource"
        :options="dataSourceOptions"
        label="数据来源"
        @update:model-value="handleDataSourceChange"
      />

      <q-tree
        v-if="selectedDataSource"
        v-model:selected="selectedItems"
        :nodes="treeData"
        node-key="id"
        multiple
        tick-strategy="leaf"
      />

      <q-select
        v-model="selectedAIType"
        :options="aiProcessTypes"
        label="AI处理类型"
        @update:model-value="handleAITypeChange"
      />

      <q-input
        v-if="selectedAIType === '标题'"
        v-model.number="titleLengthLimit"
        type="number"
        label="标题长度限制"
      />

      <q-select
        v-if="selectedAIType === '相册'"
        v-model="selectedAlbumCategory"
        :options="albumCategories"
        label="相册归纳范围"
      />

      <q-btn
        type="submit"
        color="primary"
        label="提交处理"
        :disable="!canSubmit"
        class="q-mt-md"
      />
    </q-form>
  </q-page>
</template>
