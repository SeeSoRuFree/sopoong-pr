export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  thumbnail?: string;
  category: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'editing' | 'published' | 'hold' | 'scheduled';
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}
