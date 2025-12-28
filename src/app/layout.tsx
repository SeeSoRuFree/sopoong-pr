import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "소풍벤처스 | 뉴스룸",
  description: "소풍벤처스의 벤처업계, 포트폴리오사 관련 콘텐츠를 만나보세요.",
  keywords: ["소풍벤처스", "벤처캐피탈", "스타트업", "포트폴리오", "기후테크"],
  authors: [{ name: "소풍벤처스" }],
  openGraph: {
    title: "소풍벤처스 | 뉴스룸",
    description: "소풍벤처스의 벤처업계, 포트폴리오사 관련 콘텐츠를 만나보세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "소풍벤처스 뉴스룸",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
