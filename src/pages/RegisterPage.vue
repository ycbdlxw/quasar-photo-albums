<template>
  <q-page class="flex flex-center">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">注册</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="organization"
            label="注册机构"
          />

          <q-input
            filled
            v-model="username"
            label="用户名"


          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="密码"
          />

          <div>
            <q-btn label="注册" type="submit" color="primary" />
            <q-btn
              label="返回登录"
              color="secondary"
              flat
              class="q-ml-sm"
              @click="$router.push('/login')"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

const organization = ref('');
const username = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    await authStore.register(
      organization.value,
      username.value,
      password.value,
    );
    $q.notify({
      color: 'positive',
      message: '注册成功',
    });
    router.push('/login'); // 注册成功后跳转到登录页
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: '注册失败，用户可能已存在',
    });
  }
};
</script>
