// src/stores/media.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  date: string;
}

export const useMediaStore = defineStore('media', () => {
  const media = ref<MediaItem[]>([]);
  const page = ref(1);

  const fetchMedia = async () => {
    try {
      const response = await api.get('/media', { params: { page: 1 } });
      media.value = response.data;
      page.value = 1;
    } catch (error) {
      console.error('Failed to fetch media:', error);
      throw error;
    }
  };

  const fetchMoreMedia = async () => {
    try {
      const nextPage = page.value + 1;
      const response = await api.get('/media', { params: { page: nextPage } });
      media.value.push(...response.data);
      page.value = nextPage;
    } catch (error) {
      console.error('Failed to fetch more media:', error);
      throw error;
    }
  };

  return { media, fetchMedia, fetchMoreMedia };
});
