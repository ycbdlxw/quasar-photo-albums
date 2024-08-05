<template>
  <q-list bordered class="sidebar">
    <q-item clickable v-ripple @click="selectTab('photos')">
      <q-item-section avatar>
        <q-icon name="image" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple @click="selectTab('folders')">
      <q-item-section avatar>
        <q-icon name="folder" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple @click="selectTab('albums')">
      <q-item-section avatar>
        <q-icon name="photo_album" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['tab-selected']);

const selectTab = (tab: string) => {
  emit('tab-selected', tab);
};
</script>

<style>
.sidebar {
  width: 50px;
}
</style>
