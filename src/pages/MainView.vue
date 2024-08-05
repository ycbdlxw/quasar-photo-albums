<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Photo Service</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="main-content row">
          <NavigationSidebar @tab-selected="selectTab" />
          <ContentArea
            :currentTab="currentTab"
            :photos="photos"
            @photo-selected="selectPhoto"
          />
        </div>
        <q-fab v-if="selectedPhotos.length > 0" @click="toggleActionMenu">
          <q-fab-action icon="delete" />
        </q-fab>
        <q-dialog v-model="showActionMenu">
          <q-card>
            <q-list>
              <q-item
                clickable
                v-ripple
                @click="handleAction('Edit date and time')"
              >
                <q-item-section>Edit date and time</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-dialog>
        <q-dialog v-model="showDateTimePicker">
          <DateTimePicker
            @confirm="onConfirmDateTime"
            @cancel="hideDateTimePicker"
          />
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationSidebar from '../components/NavigationSidebar.vue';
import ContentArea from '../components/ContentArea.vue';
import DateTimePicker from '../components/DateTimePicker.vue';
import { Photo } from '../components/models';
const selectedPhotos = ref<Photo[]>([]);

const currentTab = ref('photos');
const photos = ref([
  // 示例照片数据
  { id: 1, url: 'path/to/photo1.jpg' },
  { id: 2, url: 'path/to/photo2.jpg' },
  // 更多照片数据
]);
const showActionMenu = ref(false);
const showDateTimePicker = ref(false);

const selectTab = (tab: string) => {
  currentTab.value = tab;
};

const selectPhoto = (photo: Photo) => {
  if (selectedPhotos.value.includes(photo)) {
    selectedPhotos.value = selectedPhotos.value.filter((p) => p !== photo);
  } else {
    selectedPhotos.value.push(photo);
  }
};

const toggleActionMenu = () => {
  showActionMenu.value = !showActionMenu.value;
};

const handleAction = (action: string) => {
  if (action === 'Edit date and time') {
    showDateTimePicker.value = true;
  }
  showActionMenu.value = false;
};

const onConfirmDateTime = () => {
  // $q.notify(`Selected date and time:${dateTime}`);
  showDateTimePicker.value = false;
};

const hideDateTimePicker = () => {
  showDateTimePicker.value = false;
};
</script>

<style>
.main-content {
  display: flex;
  flex: 1;
}
</style>
