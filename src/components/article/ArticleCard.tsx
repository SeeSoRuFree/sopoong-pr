import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  thumbnail?: string;
  category?: string;
  date: string;
  variant?: 'default' | 'compact';
}

export default function ArticleCard({
  id,
  title,
  summary,
  thumbnail,
  category,
  date,
  variant = 'default',
}: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${id}`}
        className="group flex gap-4 py-4 border-b border-gray-100 last:border-b-0"
      >
        {thumbnail && (
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <span className="text-xs font-medium text-[var(--color-primary)] mb-1 block">
              {category}
            </span>
          )}
          <h3 className="text-base font-semibold text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors korean-text">
            {title}
          </h3>
          <time className="text-xs text-[var(--color-text-muted)] mt-1 block">
            {date}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${id}`} className="group block">
      <article className="h-full">
        {/* 썸네일 */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20" />
          )}
        </div>

        {/* 콘텐츠 */}
        <div className="space-y-2">
          {category && (
            <span className="text-xs font-medium text-[var(--color-primary)]">
              {category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors korean-text">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 korean-text">
            {summary}
          </p>
          <time className="text-xs text-[var(--color-text-muted)] block">
            {date}
          </time>
        </div>
      </article>
    </Link>
  );
}
