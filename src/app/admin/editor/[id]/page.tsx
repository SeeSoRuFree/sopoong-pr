'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { categories } from '@/lib/sample-data';
import { getArticleById, saveArticle, getStoredArticles } from '@/lib/article-store';
import type { Article } from '@/types/article';

// 클라이언트에서만 로드
const RichTextEditor = dynamic(
  () => import('@/components/admin/RichTextEditor'),
  { ssr: false, loading: () => <div className="h-[400px] bg-gray-50 rounded-lg animate-pulse" /> }
);

const statusOptions = [
  { value: 'draft', label: '작성 중' },
  { value: 'editing', label: '수정 중' },
  { value: 'published', label: '출고 완료' },
  { value: 'hold', label: '보류' },
  { value: 'scheduled', label: '예약 출고' },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    thumbnail: '',
    category: categories[0]?.name || '',
    status: 'draft' as Article['status'],
    isFeatured: false,
  });

  // 기존 데이터 로드
  useEffect(() => {
    if (!isNew) {
      const article = getArticleById(id);
      if (article) {
        setFormData({
          title: article.title,
          summary: article.summary,
          content: article.content,
          thumbnail: article.thumbnail || '',
          category: article.category,
          status: article.status,
          isFeatured: article.isFeatured,
        });
      }
      setLoading(false);
    }
  }, [id, isNew]);

  // 이미지 alt 텍스트를 figcaption으로 변환하는 함수
  const transformImageAltToFigcaption = (html: string): string => {
    // <img src="..." alt="캡션텍스트"> 를 <figure><img src="..." alt="캡션텍스트"><figcaption>캡션텍스트</figcaption></figure>로 변환
    return html.replace(
      /<img\s+([^>]*?)alt="([^"]+)"([^>]*?)>/gi,
      (match, before, altText, after) => {
        // alt 텍스트가 비어있거나 기본값인 경우 변환하지 않음
        if (!altText || altText === 'image' || altText === 'img') {
          return match;
        }
        return `<figure><img ${before}alt="${altText}"${after}><figcaption>${altText}</figcaption></figure>`;
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 이미지 alt 텍스트를 figcaption으로 변환
      const transformedContent = transformImageAltToFigcaption(formData.content);

      // localStorage에 저장
      const savedArticle = saveArticle({ ...formData, content: transformedContent }, isNew ? undefined : id);
      console.log('저장된 데이터:', savedArticle);

      setSaving(false);
      alert(isNew ? '새 콘텐츠가 생성되었습니다.' : '콘텐츠가 수정되었습니다.');
      router.push('/admin');
    } catch (error) {
      console.error('저장 실패:', error);
      setSaving(false);
      alert('저장에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? '새 글 작성' : '글 수정'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            미리보기
          </button>
          <Link
            href="/admin"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            form="editor-form"
            disabled={saving}
            className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      <form id="editor-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 영역 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 제목 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-lg"
                placeholder="콘텐츠 제목을 입력하세요"
                required
              />
            </div>

            {/* 본문 에디터 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                본문 <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="본문 내용을 입력하세요. 한글 콘텐츠에 최적화되어 있습니다."
              />
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 상태 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Article['status'] })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* 카테고리 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* 메인 PICK */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm font-medium text-gray-700">
                  메인 PICK 설정
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                메인 페이지 상단에 대형으로 노출됩니다.
              </p>
            </div>

            {/* 썸네일 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                썸네일
              </label>
              {/* 파일 업로드 */}
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        alert('이미지 크기는 2MB 이하로 해주세요.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, thumbnail: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-hover)] file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">최대 2MB, JPG/PNG/GIF</p>
              </div>
              {/* URL 입력 (대안) */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">또는 URL:</span>
                <input
                  type="url"
                  value={formData.thumbnail.startsWith('data:') ? '' : formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full pl-16 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              {formData.thumbnail && (
                <div className="mt-4 relative">
                  <img
                    src={formData.thumbnail}
                    alt="썸네일 미리보기"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: '' })}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* 요약 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요약 (3줄 이내)
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-none"
                rows={4}
                placeholder="메인 페이지와 목록에 표시될 요약을 입력하세요"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.summary.length} / 150자
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* 미리보기 모달 */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-screen bg-white">
            {/* 미리보기 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                    미리보기 모드
                  </span>
                  <span className="text-sm text-gray-500">
                    실제 화면과 동일하게 표시됩니다
                  </span>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  닫기
                </button>
              </div>
            </div>

            {/* 히어로 섹션 */}
            <section className="relative bg-gradient-to-br from-[#061b37] to-[#0d2d5a] text-white">
              <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                  <span className="inline-block text-sm font-medium text-[var(--color-primary)] bg-white/10 px-3 py-1 rounded-full mb-6">
                    {formData.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ wordBreak: 'keep-all' }}>
                    {formData.title || '제목을 입력하세요'}
                  </h1>
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <span className="font-medium">소풍벤처스</span>
                    <span>·</span>
                    <time>{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-[40px]" />
            </section>

            {/* 본문 섹션 */}
            <article className="py-12 md:py-16">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p style="color: #999;">본문 내용을 입력하세요...</p>' }}
              />
            </article>

            {/* 하단 정보 */}
            <section className="border-t border-gray-100">
              <div className="max-w-[720px] mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">소풍벤처스</p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 text-sm text-gray-600 rounded-full">
                    #{formData.category}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
