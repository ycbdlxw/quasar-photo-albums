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
      <q-img
        src="path/to/photo1.jpg"
        @click="viewPhoto('path/to/photo1.jpg')"
      />

      <q-item-label header>7月30日</q-item-label>
      <div class="row wrap">
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="col-xs-12 col-sm-4 q-px-sm q-py-sm"
        >
          <q-img :src="photo.url" @click="viewPhoto(photo.url)" />
          <q-icon
            v-if="photo.isVideo"
            name="play_circle"
            class="absolute-bottom-right"
            size="xs"
          />
        </div>
      </div>
    </q-list>

    <q-tab-panels v-model="tab" class="q-mt-md">
      <q-tab-panel name="photos">
        <PhotoGallery />
      </q-tab-panel>
      <q-tab-panel name="albums">
        <!-- Album content here -->
      </q-tab-panel>
      <q-tab-panel name="shared">
        <!-- Shared content here -->
      </q-tab-panel>
      <q-tab-panel name="more">
        <!-- More content here -->
      </q-tab-panel>
    </q-tab-panels>

    <q-footer>
      <q-tabs v-model="tab" align="justify" class="bg-grey-1 text-grey-9">
        <q-tab name="photos" icon="photo" label="照片" />
        <q-tab name="albums" icon="photo_album" label="相册" />
        <q-tab name="shared" icon="share" label="共享" />
        <q-tab name="more" icon="more_horiz" label="更多" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const $q = useQuasar();
const tab = ref('photos');
const photos = ref([
  { id: 1, url: 'path/to/photo2.jpg', isVideo: false },
  { id: 2, url: 'path/to/photo3.jpg', isVideo: false },
  { id: 3, url: 'path/to/video1.mp4', isVideo: true },
  { id: 4, url: 'path/to/video2.mp4', isVideo: true },
  // 更多照片或视频数据
]);

const onSearch = () => {
  $q.notify({
    message: '搜索功能待实现',
    color: 'primary',
  });
};

const viewPhoto = (url: string) => {
  $q.dialog({
    title: '查看照片',
    message: `<img src="${url}" style="width: 100%;" />`,
    html: true,
  });
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
