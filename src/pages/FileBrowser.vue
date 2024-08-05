// src/pages/FileBrowser.vue
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          文件浏览器
          <span v-if="store.selectedNode" class="text-caption">
            <!-- ({{ store.selectedNode.name }}) -->
          </span>
        </q-toolbar-title>
        <q-toolbar-title class="text-caption">
          {{ store.totalRecords }} 条记录 | 第 {{ store.currentPage - 1 }}/{{
            totalPages
          }}
          页
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="col-3">
            <q-tree
              :nodes="store.treeData"
              node-key="id"
              v-model="store.selected"
              :expand-all="false"
            />
          </div>
          <div class="col-9">
            <YearMonthGroup :photos="store.photos" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue';
import { useFileBrowserStore } from '../stores/file-browser-store';
import YearMonthGroup from '../components/YearMonthGroup.vue';

const store = useFileBrowserStore();

onMounted(async () => {
  await store.fetchTreeData();
});

watchEffect(() => {
  if (store.selectedNode) {
    store.fetchPhotosForNode(store.selectedNode);
  }
});

const totalPages = computed(() =>
  Math.ceil(store.totalRecords / store.pageSize),
);
</script>
