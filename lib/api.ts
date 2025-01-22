import { Post, ApiResponse } from '@/components/ui/CardList';

type Pagination<T> = {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export const API = {
  root: 'https://pocketbase-front-323.fjx.su',
  get: async <T>(endpoint: string) => {
    const response = await fetch(`${API.root}/api/${endpoint}`);
    return response.json() as Promise<T>;
  },
  getPost: async (id: string) => {
    const res = await API.get<Post>(`collections/posts/records/${id}`);
    return res;
  },
  getPosts: async (page: number = 1, perPage: number = 30) => {
    const res = await API.get<Pagination<Post>>(
      `collections/posts/records?page=${page}&perPage=${perPage}`,
    );
    return res;
  },
  getImageUrl: (res: { collectionId: string; id: string; image?: string }) =>
    res.image
      ? `${API.root}/api/files/${res.collectionId}/${res.id}/${res.image}`
      : undefined,
};
