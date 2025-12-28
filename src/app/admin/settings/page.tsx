'use client';

import { useState } from 'react';
import { categories } from '@/lib/sample-data';

export default function SettingsPage() {
  const [slogan, setSlogan] = useState('지속가능한 내일을 위한 투자 – sopoong ventures');
  const [categoryList, setCategoryList] = useState(categories);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert('설정이 저장되었습니다.');
  };

  const updateCategory = (id: string, field: string, value: string) => {
    setCategoryList(categoryList.map((cat) =>
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const addCategory = () => {
    const newId = String(Date.now());
    setCategoryList([
      ...categoryList,
      { id: newId, slug: '', name: '새 카테고리', description: '' },
    ]);
  };

  const removeCategory = (id: string) => {
    if (categoryList.length <= 1) {
      alert('최소 1개 이상의 카테고리가 필요합니다.');
      return;
    }
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
      setCategoryList(categoryList.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">설정</h1>
          <p className="text-gray-600 mt-1">사이트 설정을 관리합니다.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* 슬로건 설정 */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">슬로건 바</h2>
        <p className="text-sm text-gray-500 mb-4">
          메인 페이지 상단에 표시되는 슬로건을 설정합니다.
        </p>
        <input
          type="text"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
          placeholder="슬로건을 입력하세요"
        />
        <div className="mt-4 p-4 bg-[var(--color-primary)] text-white text-sm text-center rounded-lg">
          미리보기: {slogan}
        </div>
      </div>

      {/* 카테고리 관리 */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">카테고리 관리</h2>
            <p className="text-sm text-gray-500 mt-1">
              콘텐츠 카테고리를 추가, 수정, 삭제합니다.
            </p>
          </div>
          <button
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            카테고리 추가
          </button>
        </div>

        <div className="space-y-4">
          {categoryList.map((category, index) => (
            <div
              key={category.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-lg text-sm font-medium text-gray-600">
                {index + 1}
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    카테고리명 (메뉴 표시)
                  </label>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    placeholder="예: 소풍VIEW"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    URL 슬러그
                  </label>
                  <input
                    type="text"
                    value={category.slug}
                    onChange={(e) => updateCategory(category.id, 'slug', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    placeholder="예: view"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    설명
                  </label>
                  <input
                    type="text"
                    value={category.description || ''}
                    onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    placeholder="카테고리 설명"
                  />
                </div>
              </div>
              <button
                onClick={() => removeCategory(category.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="삭제"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 기타 설정 */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기타 설정</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">기본 작성자명</p>
              <p className="text-sm text-gray-500">콘텐츠의 기본 작성자 이름</p>
            </div>
            <input
              type="text"
              defaultValue="소풍벤처스"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm w-40"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">SEO 사이트명</p>
              <p className="text-sm text-gray-500">검색엔진에 표시될 사이트 이름</p>
            </div>
            <input
              type="text"
              defaultValue="소풍벤처스 뉴스룸"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm w-40"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">AI 학습 거부 표시</p>
              <p className="text-sm text-gray-500">푸터에 AI 학습 거부 문구 표시</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 관리자 계정 */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">관리자 계정</h2>
        <p className="text-sm text-gray-500 mb-4">
          관리자 비밀번호를 변경합니다. (현재 계정: admin)
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              placeholder="현재 비밀번호"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              placeholder="새 비밀번호"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              placeholder="새 비밀번호 확인"
            />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors">
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
}
