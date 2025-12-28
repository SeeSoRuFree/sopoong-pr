import Image from 'next/image';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export default function ImageWithCaption({
  src,
  alt,
  caption,
  priority = false,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-[var(--color-text-secondary)] text-center mt-3 korean-text">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
