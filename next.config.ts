import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 플레이스홀더 이미지 서비스 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // 로컬 이미지 사용 시 빈 배열로 설정
    unoptimized: false,
  },
};

export default nextConfig;
