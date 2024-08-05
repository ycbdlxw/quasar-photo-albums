<template>
  <div class="content">
    <div v-if="props.currentTab === 'photos'" class="photos-content">
      <q-img
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.url"
        @click="selectPhoto(photo)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  currentTab: string;
  photos: { id: number; url: string }[];
}>();

const emit = defineEmits(['photo-selected']);

const selectPhoto = (photo: { id: number; url: string }) => {
  emit('photo-selected', photo);
};
</script>

<style>
.content {
  flex: 1;
  overflow-y: auto;
}
.photos-content {
  display: flex;
  flex-wrap: wrap;
}
.photos-content q-img {
  width: 100px;
  height: 100px;
  margin: 5px;
}
</style>
