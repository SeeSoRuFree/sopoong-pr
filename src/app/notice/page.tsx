import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ArticleCard } from '@/components/article';
import { getArticlesByCategory } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: '공지사항 | 소풍벤처스',
  description: '소풍벤처스의 공지사항과 소식',
};

export default function NoticePage() {
  const articles = getArticlesByCategory('notice');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 페이지 헤더 */}
        <section className="bg-[var(--background-secondary)] py-12 md:py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
              공지사항
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] korean-text">
              소풍벤처스의 공지사항과 소식
            </p>
          </div>
        </section>

        {/* 콘텐츠 목록 */}
        <section className="py-12 md:py-16">
          <div className="container">
            {articles.length > 0 ? (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {articles.map((article) => (
                    <div key={article.id} className="p-6">
                      <ArticleCard
                        id={article.id}
                        title={article.title}
                        summary={article.summary}
                        thumbnail={article.thumbnail}
                        category={article.category}
                        date={article.publishedAt}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[var(--color-text-secondary)]">
                  등록된 공지사항이 없습니다.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
