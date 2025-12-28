import Image from 'next/image';
import Link from 'next/link';

interface FeaturedArticleProps {
  id: string;
  title: string;
  summary: string;
  thumbnail?: string;
  category?: string;
  date: string;
}

export default function FeaturedArticle({
  id,
  title,
  summary,
  thumbnail,
  category,
  date,
}: FeaturedArticleProps) {
  return (
    <Link href={`/article/${id}`} className="group block">
      <article className="relative grid md:grid-cols-2 gap-6 md:gap-8 bg-[var(--background-secondary)] rounded-2xl overflow-hidden">
        {/* 이미지 영역 */}
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px]">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
          )}
          {/* 소풍 PICK 라벨 */}
          <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
            소풍 PICK
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col justify-center p-6 md:p-8 md:pr-12">
          {category && (
            <span className="text-sm font-medium text-[var(--color-primary)] mb-3">
              {category}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4 group-hover:text-[var(--color-primary)] transition-colors korean-text leading-tight">
            {title}
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mb-6 line-clamp-3 korean-text leading-relaxed">
            {summary}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--color-text)]">
              소풍벤처스
            </span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <time className="text-sm text-[var(--color-text-muted)]">{date}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
