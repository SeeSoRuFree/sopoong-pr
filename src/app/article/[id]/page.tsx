'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { getArticleById } from '@/lib/article-store';
import type { Article } from '@/types/article';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ArticlePage({ params }: PageProps) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 ID로 찾기
    const found = getArticleById(id);
    if (found) {
      setArticle(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-[#061b37] to-[#0d2d5a] text-white">
          <div className="container pt-20 pb-16 md:pt-28 md:pb-24">
            <div className="max-w-3xl mx-auto text-center pt-8 md:pt-12">
              <span className="inline-block text-sm font-medium text-[var(--color-primary)] bg-white/10 px-3 py-1 rounded-full mb-6">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 korean-text">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <span className="font-medium">{article.author}</span>
                <span>·</span>
                <time>{article.publishedAt}</time>
              </div>
            </div>
          </div>
          {/* 하단 곡선 */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-[40px]" />
        </section>

        {/* 본문 섹션 */}
        <article className="py-12 md:py-16">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* 하단 정보 */}
        <section className="border-t border-gray-100">
          <div className="container py-12">
            <div className="max-w-[var(--max-width-content)] mx-auto pt-8 md:pt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text)]">
                    {article.author}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {article.publishedAt}
                  </p>
                </div>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[var(--background-secondary)] text-sm text-[var(--color-text-secondary)] rounded-full">
                  #{article.category}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
