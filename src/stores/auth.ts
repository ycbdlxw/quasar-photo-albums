// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/login', { username, password });
      user.value = response.data.user;
      // 这里你可能还需要保存 token 等信息
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (
    organization: string,
    username: string,
    password: string,
  ) => {
    try {
      const response = await api.post('/register', {
        organization,
        username,
        password,
      });
      // 注册成功后，你可能想直接登录用户，或者只是返回成功消息
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    // 这里你可能还需要清除 token 等信息
  };

  return { user, login, register, logout };
});
