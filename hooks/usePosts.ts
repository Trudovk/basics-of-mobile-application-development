import { Post } from '@/components/ui/CardList';
import { API } from '@/lib/api';
import { useEffect, useState } from 'react';

export const usePosts = (startingPage = 1) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(startingPage);
  const [error, setError] = useState(null);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const result = await API.getPosts(page);
      setData((d) => [...d, ...result.items]);
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  return { data, loading, page, setPage, error };
};

export const usePost = (id: string) => {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await API.getPost(id);
      setData(result);
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
