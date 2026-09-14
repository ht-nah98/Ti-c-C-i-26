import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Không đặt `output: "standalone"` ở đây.
   *
   * Template gốc bật tuỳ chọn đó để tự host bằng Docker, nhưng Vercel có
   * cơ chế đóng gói riêng: khi bật standalone, Next.js ghi file trace vào
   * `.next/standalone/` nên Vercel không tìm thấy `.next/next-server.js.nft.json`
   * và build hỏng ở bước cuối.
   *
   * Nếu sau này cần build Docker, chạy với biến môi trường:
   *   BUILD_STANDALONE=1 npm run build
   */
  ...(process.env.BUILD_STANDALONE === "1"
    ? { output: "standalone" as const }
    : {}),
};

export default nextConfig;
