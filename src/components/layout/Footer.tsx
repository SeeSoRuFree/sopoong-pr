import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white py-12 mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <Link
              href="https://sopoong.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <span className="text-xl font-bold text-white">sopoong</span>
            </Link>
            <div className="text-sm text-gray-400 leading-relaxed space-y-1">
              <p>소풍벤처스 (Sopoong Ventures)</p>
              <p>서울특별시 강남구 테헤란로 501, 브이플렉스 5층</p>
            </div>
          </div>

          {/* 링크 */}
          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold mb-4">콘텐츠</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/view" className="hover:text-white transition-colors">
                    소풍VIEW
                  </Link>
                </li>
                <li>
                  <Link href="/pick" className="hover:text-white transition-colors">
                    소풍PICK
                  </Link>
                </li>
                <li>
                  <Link href="/notice" className="hover:text-white transition-colors">
                    공지사항
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">소풍벤처스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="https://sopoong.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    공식 홈페이지
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-xs text-gray-500 space-y-2">
            <p>AI 학습용 정보 수집, 활용을 거부합니다.</p>
            <p>
              모든 콘텐츠의 저작권은 소풍벤처스에 있으며 허가 없이 인용 및 전재를
              금지합니다.
            </p>
            <p className="mt-4">
              © {new Date().getFullYear()} Sopoong Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
