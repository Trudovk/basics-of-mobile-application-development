import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CardList } from '../ui/CardList';
import { API } from '@/lib/api';

// Мок для API
jest.mock('@/lib/api', () => ({
  API: {
    getPosts: jest.fn(),
  },
}));

describe('CardList Integration', () => {
  const mockPosts = {
    items: [
      {
        id: '1',
        header: 'Test Post 1',
        text: 'Test Content 1',
        image: 'https://example.com/image1.jpg',
      },
      {
        id: '2',
        header: 'Test Post 2',
        text: 'Test Content 2',
      },
    ],
    page: 1,
    perPage: 30,
    totalItems: 2,
    totalPages: 1,
  };

  beforeEach(() => {
    (API.getPosts as jest.Mock).mockClear();
  });

  it('should fetch and render posts correctly', async () => {
    (API.getPosts as jest.Mock).mockResolvedValueOnce(mockPosts);

    const { getByText, queryByTestId } = render(<CardList />);

    // Проверяем отображение загрузки
    expect(queryByTestId('loading-indicator')).not.toBeNull();

    // Ждем загрузки данных
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    // Проверяем отображение постов
    expect(getByText('Test Post 1')).toBeTruthy();
    expect(getByText('Test Post 2')).toBeTruthy();
    expect(getByText('Test Content 1')).toBeTruthy();
    expect(getByText('Test Content 2')).toBeTruthy();

    // Проверяем, что изображение отображается только для первого поста
    expect(queryByTestId('card-image-1')).toBeTruthy();
    expect(queryByTestId('card-image-2')).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    (API.getPosts as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { getByText, queryByTestId } = render(<CardList />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(getByText('Failed to load posts')).toBeTruthy();
  });
});
