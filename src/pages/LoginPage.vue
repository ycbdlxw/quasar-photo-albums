<template>
  <q-page class="flex flex-center">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">登录</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="username" label="用户名" />

          <q-input filled type="password" v-model="password" label="密码" />

          <div>
            <q-btn label="登录" type="submit" color="primary" />
            <q-btn
              label="注册"
              color="secondary"
              flat
              class="q-ml-sm"
              @click="$router.push('/register')"
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

const username = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    await authStore.login(username.value, password.value);
    $q.notify({
      color: 'positive',
      message: '登录成功',
    });
    router.push('/'); // 登录成功后跳转到首页
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: '登录失败，请检查用户名和密码',
    });
  }
};
</script>
