// src/router/routes.ts
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MediaGallery.vue') },
      { path: 'photo', component: () => import('pages/MainView.vue') },
      { path: 'photos', component: () => import('pages/photo/MainPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      {
        path: 'ai-processor',
        component: () => import('pages/AIImageProcessor.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
