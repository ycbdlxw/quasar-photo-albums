// src/stores/file-browser-store.ts
import { defineStore } from 'pinia';

export const useFileBrowserStore = defineStore('fileBrowser', {
  state: () => ({
    treeData: [],
    selectedNode: null,
    photos: [],
    currentPage: 1,
    totalRecords: 0,
    pageSize: 10,
    loading: false,
    selected: false,
    name: '',
    id: Number,
  }),
  actions: {
    async fetchTreeData() {
      // Fetch tree data from the server
      const response = await fetch('/api/tree-data');
      const data = await response.json();
      this.treeData = data;
    },
    async fetchPhotosForNode(nodeId: unknown) {
      if (this.loading) return;
      this.loading = true;

      // Fetch photos for the selected node
      const response = await fetch(
        `/api/photos?nodeId=${nodeId}&page=${this.currentPage}&pageSize=${this.pageSize}`,
      );
      const data = await response.json();

      // this.photos = [...this.photos, ...data.photos];
      this.totalRecords = data.totalRecords;
      this.currentPage++;
      this.loading = false;
    },

    clearPhotos() {
      this.photos = [];
      this.currentPage = 1;
    },
    // selectNode(node) {
    //   this.clearPhotos();
    //   this.selectedNode = node;
    //   this.fetchPhotosForNode(node.id);
    // },
  },
});
