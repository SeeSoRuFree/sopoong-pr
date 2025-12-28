'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { ArticleCard, FeaturedArticle } from '@/components/article';
import {
  getStoredArticles,
  getFeaturedArticleFromStore,
} from '@/lib/article-store';
import type { Article } from '@/types/article';

export default function HomePage() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [viewArticles, setViewArticles] = useState<Article[]>([]);
  const [pickArticles, setPickArticles] = useState<Article[]>([]);
  const [noticeArticles, setNoticeArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 데이터 로드
    const articles = getStoredArticles();
    const publishedArticles = articles.filter(a => a.status === 'published');

    // Featured 아티클
    const featured = getFeaturedArticleFromStore();
    setFeaturedArticle(featured || null);

    // 카테고리별 아티클
    setViewArticles(publishedArticles.filter(a => a.category === '소풍VIEW').slice(0, 3));
    setPickArticles(publishedArticles.filter(a => a.category === '소풍PICK').slice(0, 3));
    setNoticeArticles(publishedArticles.filter(a => a.category === '공지사항').slice(0, 3));

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 슬로건 바 */}
        <section className="bg-[var(--color-primary)] text-white">
          <div className="container">
            <Link
              href="https://sopoong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>지속가능한 내일을 위한 투자 – sopoong ventures</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* 소풍 PICK 섹션 */}
        {featuredArticle && (
          <section className="py-12 md:py-16">
            <div className="container">
              <FeaturedArticle
                id={featuredArticle.id}
                title={featuredArticle.title}
                summary={featuredArticle.summary}
                thumbnail={featuredArticle.thumbnail}
                category={featuredArticle.category}
                date={featuredArticle.publishedAt}
              />
            </div>
          </section>
        )}

        {/* 소풍VIEW 섹션 */}
        <section className="py-12 md:py-16 bg-[var(--background-secondary)]">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                소풍VIEW
              </h2>
              <Link
                href="/view"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                더보기 →
              </Link>
            </div>
            {viewArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {viewArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    summary={article.summary}
                    thumbnail={article.thumbnail}
                    category={article.category}
                    date={article.publishedAt}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-[var(--color-text-secondary)] py-8">
                등록된 글이 없습니다.
              </p>
            )}
          </div>
        </section>

        {/* 소풍PICK 섹션 */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                소풍PICK
              </h2>
              <Link
                href="/pick"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                더보기 →
              </Link>
            </div>
            {pickArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {pickArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    summary={article.summary}
                    thumbnail={article.thumbnail}
                    category={article.category}
                    date={article.publishedAt}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-[var(--color-text-secondary)] py-8">
                등록된 글이 없습니다.
              </p>
            )}
          </div>
        </section>

        {/* 공지사항 섹션 */}
        <section className="py-12 md:py-16 border-t border-gray-100">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                공지사항
              </h2>
              <Link
                href="/notice"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                더보기 →
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              {noticeArticles.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {noticeArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      summary={article.summary}
                      thumbnail={article.thumbnail}
                      category={article.category}
                      date={article.publishedAt}
                      variant="compact"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--color-text-secondary)] py-8">
                  등록된 공지사항이 없습니다.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
