// src/api/aiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 假设我们的API基础URL是'/api'
});

export interface ProcessImageParams {
  items: string[];
  aiType: string;
  titleLengthLimit?: number;
  albumCategory?: string;
}

export const fetchTreeData = async (dataSource: string) => {
  const response = await api.get(`/tree-data/${dataSource}`);
  return response.data;
};

export const processImages = async (params: ProcessImageParams) => {
  const response = await api.post('/process-images', params);
  return response.data;
};
// src/api/fileService.ts
export async function getTreeData() {
  const response = await fetch('/api/tree-data');
  return await response.json();
}
export async function getPhotosForNode(
  nodeId: string,
  page: number,
  pageSize: number,
) {
  const response = await fetch(
    `/api/photos?nodeId=${nodeId}&page=${page}&pageSize=${pageSize}`,
  );
  return await response.json();
}
