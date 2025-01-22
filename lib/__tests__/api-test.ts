import { API } from '../api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch a single post', async () => {
    const mockPost = {
      id: '123',
      title: 'Test Post',
      content: 'Test Content',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPost),
    });

    const result = await API.getPost('123');

    expect(fetch).toHaveBeenCalledWith(
      'https://pocketbase-front-323.fjx.su/api/collections/posts/records/123',
    );
    expect(result).toEqual(mockPost);
  });

  it('should fetch posts with pagination', async () => {
    const mockPaginatedResponse = {
      items: [{ id: '1', title: 'Post 1' }],
      page: 1,
      perPage: 50,
      totalItems: 1,
      totalPages: 1,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPaginatedResponse),
    });

    const result = await API.getPosts(1, 50);

    expect(fetch).toHaveBeenCalledWith(
      'https://pocketbase-front-323.fjx.su/api/collections/posts/records?page=1&perPage=50',
    );
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should use default pagination values', async () => {
    const mockResponse = { items: [] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    await API.getPosts();

    expect(fetch).toHaveBeenCalledWith(
      'https://pocketbase-front-323.fjx.su/api/collections/posts/records?page=1&perPage=30',
    );
  });
});
