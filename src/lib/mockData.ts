export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

let mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 introduces powerful new features including Server Actions, which allow us to handle form submissions and data mutations without client-side JavaScript. This makes our applications faster and more reliable.',
    author: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Understanding Payload CMS',
    content: 'Payload is a modern headless CMS that provides a powerful admin interface and flexible API. It integrates seamlessly with Next.js and supports multiple databases.',
    author: 'Jane Smith',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Server Actions vs useEffect',
    content: 'Server Actions provide a better way to handle data mutations compared to traditional useEffect patterns. They run on the server, providing better performance and security.',
    author: 'Mike Johnson',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

export const getMockPosts = (): BlogPost[] => [...mockPosts];

export const getMockPostById = (id: string): BlogPost | null => {
  return mockPosts.find(post => post.id === id) || null;
};

export const createMockPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockPosts.push(newPost);
  return newPost;
};

export const updateMockPost = (id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): BlogPost | null => {
  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  mockPosts[index] = {
    ...mockPosts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  return mockPosts[index];
};

export const deleteMockPost = (id: string): boolean => {
  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  mockPosts.splice(index, 1);
  return true;
};
