import { Article } from '@/types/article';
import { sampleArticles } from './sample-data';

const STORAGE_KEY = 'sopoong_articles';

// 슬러그 생성 함수
function generateSlug(title: string): string {
  const timestamp = Date.now();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
  return `${slug}-${timestamp}`;
}

// localStorage에서 아티클 목록 가져오기
export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') {
    return sampleArticles;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load articles from localStorage:', error);
  }

  // 초기 데이터가 없으면 샘플 데이터로 초기화
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleArticles));
  return sampleArticles;
}

// 아티클 저장하기
export function saveArticle(articleData: Partial<Article>, existingId?: string): Article {
  const articles = getStoredArticles();
  const now = new Date().toISOString();

  if (existingId && existingId !== 'new') {
    // 기존 아티클 수정
    const index = articles.findIndex(a => a.id === existingId);
    if (index !== -1) {
      const updated: Article = {
        ...articles[index],
        ...articleData,
        updatedAt: now,
      };
      articles[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      return updated;
    }
  }

  // 새 아티클 생성
  const newArticle: Article = {
    id: String(Date.now()),
    slug: generateSlug(articleData.title || 'untitled'),
    title: articleData.title || '',
    summary: articleData.summary || '',
    content: articleData.content || '',
    thumbnail: articleData.thumbnail || '',
    category: articleData.category || '소풍VIEW',
    author: '소풍벤처스',
    publishedAt: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace('.', ''),
    status: articleData.status || 'draft',
    isFeatured: articleData.isFeatured || false,
    createdAt: now,
    updatedAt: now,
  };

  articles.unshift(newArticle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  return newArticle;
}

// ID로 아티클 가져오기
export function getArticleById(id: string): Article | undefined {
  const articles = getStoredArticles();
  return articles.find(a => a.id === id);
}

// 슬러그로 아티클 가져오기
export function getArticleBySlugFromStore(slug: string): Article | undefined {
  const articles = getStoredArticles();
  return articles.find(a => a.slug === slug);
}

// 아티클 삭제
export function deleteArticle(id: string): boolean {
  const articles = getStoredArticles();
  const filtered = articles.filter(a => a.id !== id);

  if (filtered.length !== articles.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
}

// 카테고리별 아티클 가져오기
export function getArticlesByCategory(categoryName: string): Article[] {
  const articles = getStoredArticles();
  return articles.filter(a => a.category === categoryName && a.status === 'published');
}

// Featured 아티클 가져오기
export function getFeaturedArticleFromStore(): Article | undefined {
  const articles = getStoredArticles();
  return articles.find(a => a.isFeatured && a.status === 'published');
}

// 최신 아티클 가져오기
export function getLatestArticlesFromStore(count: number = 6): Article[] {
  const articles = getStoredArticles();
  return articles
    .filter(a => a.status === 'published')
    .slice(0, count);
}
