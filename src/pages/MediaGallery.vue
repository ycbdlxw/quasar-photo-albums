<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-toolbar-title>照片</q-toolbar-title>
      <q-btn flat icon="search" @click="onSearch" />
      <q-btn flat icon="more_vert" />
    </q-toolbar>

    <q-separator />

    <q-list>
      <q-item-label header>7月31日</q-item-label>
      <q-img src="path/to/photo1.jpg" />

      <q-item-label header>7月30日</q-item-label>
      <div class="row wrap">
        <div
          v-for="media in mediaList"
          :key="media.id"
          class="col-xs-12 col-sm-4 q-px-sm q-py-sm"
        >
          <q-img :src="media.url" @click="viewMedia(media.url)" />
          <q-icon
            v-if="media.isVideo"
            name="play_circle"
            class="absolute-bottom-right"
            size="xs"
          />
        </div>
      </div>
    </q-list>

    <q-intersection v-if="hasMorePages" @visibility="handleVisibility" />

    <q-tabs v-model="tab" class="q-mt-md" align="justify">
      <q-tab name="photos" icon="photo" label="照片" />
      <q-tab name="albums" icon="photo_album" label="相册" />
      <q-tab name="shared" icon="share" label="共享" />
      <q-tab name="more" icon="more_horiz" label="更多" />
    </q-tabs>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const tab = ref('photos');
const hasMorePages = ref(true);
const mediaList = ref([
  { id: 1, url: 'path/to/photo2.jpg', isVideo: false },
  { id: 2, url: 'path/to/photo3.jpg', isVideo: false },
  { id: 3, url: 'path/to/video1.mp4', isVideo: true },
  { id: 4, url: 'path/to/video2.mp4', isVideo: true },
  // 更多媒体数据
]);

const onSearch = () => {
  $q.notify({
    message: '搜索功能待实现',
    color: 'primary',
  });
};

const viewMedia = (url: string) => {
  $q.dialog({
    title: '查看媒体',
    message: `<img src="${url}" style="width: 100%;" />`,
    html: true,
  });
};

const loadMoreMedia = async (isVisible: boolean) => {
  if (isVisible) {
    // 加载更多媒体文件的逻辑
    console.log('加载更多媒体文件...');
    // 模拟异步加载
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 假设加载完成后没有更多页面
    hasMorePages.value = false;
  }
};

const handleVisibility = (isVisible: boolean) => {
  loadMoreMedia(isVisible);
};
</script>

<style>
.q-img {
  cursor: pointer;
  position: relative;
}

.absolute-bottom-right {
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: white;
}
</style>
