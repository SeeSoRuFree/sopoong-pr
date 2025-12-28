import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ArticleCard } from '@/components/article';
import { getArticlesByCategory, sampleArticles } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: '소풍PICK | 소풍벤처스',
  description: '소풍벤처스가 선택한 주목할 만한 콘텐츠',
};

export default function PickPage() {
  const articles = getArticlesByCategory('pick');
  // 샘플 데이터가 부족할 경우 전체 목록에서 가져옴
  const displayArticles = articles.length > 0 ? articles : sampleArticles.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 페이지 헤더 */}
        <section className="bg-[var(--background-secondary)] py-12 md:py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
              소풍PICK
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] korean-text">
              소풍벤처스가 선택한 주목할 만한 콘텐츠
            </p>
          </div>
        </section>

        {/* 콘텐츠 목록 */}
        <section className="py-12 md:py-16">
          <div className="container">
            {displayArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayArticles.map((article) => (
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
              <div className="text-center py-16">
                <p className="text-[var(--color-text-secondary)]">
                  등록된 콘텐츠가 없습니다.
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
