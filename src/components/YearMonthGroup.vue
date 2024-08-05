// src/components/YearMonthGroup.vue
<template>
  <div>
    <div
      v-for="yearMonth in groupPhotosByYearMonth(store.photos)"
      :key="yearMonth.yearMonth"
    >
      <div class="text-h6">{{ yearMonth.yearMonth }}</div>
      <q-img
        v-for="photo in yearMonth.photos"
        :key="photo.id"
        :src="photo.url"
        @click="selectPhoto(photo)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileBrowserStore } from '../stores/file-browser-store';
import type { Photo } from '../components/models'; // Assuming you have a type definition for Photo

const store = useFileBrowserStore();
const groupPhotosByYearMonth = (
  photos: Photo[],
): { yearMonth: string; photos: Photo[] }[] => {
  const groupedPhotos = photos.reduce(
    (acc: { [key: string]: { yearMonth: string; photos: Photo[] } }, photo) => {
      const yearMonth = `${photo.date.getFullYear()}-${(photo.date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = {
          yearMonth,
          photos: [],
        };
      }
      acc[yearMonth].photos.push(photo);
      return acc;
    },
    {} as { [key: string]: { yearMonth: string; photos: Photo[] } },
  );

  return Object.values(groupedPhotos);
};

const selectPhoto = (photo: Photo) => {
  console.log('Selected photo:', photo);
};
</script>
