<template>
  <q-card>
    <q-datetime
      v-model="currentDate"
      mask="YYYY-MM-DD HH:mm"
      :options="{
        format24h: true,
        defaultView: 'Hour',
      }"
    />
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" @click="onCancel" />
      <q-btn flat label="OK" color="primary" @click="onConfirm" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const currentDate = ref(new Date().toISOString().slice(0, 16));
const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  emit('confirm', currentDate.value);
};

const onCancel = () => {
  emit('cancel');
};
</script>
