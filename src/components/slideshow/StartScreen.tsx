"use client";

import { couple, weddingDate } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/data";
import { HeartIcon } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/icons";
import { FadeUp, GrowRule, themeSrc } from "./slides/SlideParts";

/**
 * Màn chờ trước khi chạy.
 *
 * Trình duyệt chặn nhạc tự phát khi chưa có ai bấm gì, nên cần đúng một
 * cú bấm để mở nhạc và vào fullscreen. Bấm trước lúc khách vào phòng,
 * sau đó slideshow chạy liền mạch không cần đụng tới nữa.
 */
export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#efe2d8]">
      <img
        src={themeSrc("paper.webp")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.3]"
      />

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <FadeUp index={0}>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(124,106,96)]">
            <HeartIcon className="h-8 w-8 text-white" />
          </span>
        </FadeUp>

        <FadeUp index={1} className="mt-8">
          <p
            style={{
              fontFamily: "var(--font-nautigal)",
              fontSize: "clamp(48px,7.4vw,284px)",
              lineHeight: 1.1,
              color: "rgb(124,106,96)",
            }}
          >
            {couple.groom.short} &amp; {couple.bride.short}
          </p>
        </FadeUp>

        <FadeUp index={2} className="mt-3 w-[min(38vw,440px)]">
          <GrowRule delay={0.6} />
        </FadeUp>

        <FadeUp index={3} className="mt-5">
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(16px,2.52vw,97px)",
              fontWeight: 300,
              letterSpacing: "0.14em",
              color: "rgb(145,128,119)",
            }}
          >
            {weddingDate.pretty}
          </p>
        </FadeUp>

        <FadeUp index={4} className="mt-12">
          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-[rgb(124,106,96)] px-12 py-4 font-serif text-white transition-transform hover:scale-[1.03]"
            style={{
              fontSize: "clamp(17px,2.24vw,86px)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              animation: "soft-pulse 2.6s ease-in-out infinite",
            }}
          >
            Bắt đầu trình chiếu
          </button>
        </FadeUp>

        <FadeUp index={5} className="mt-8">
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(12px,1.47vw,56px)",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(145,128,119,0.9)",
            }}
          >
            Phím tắt: ← → chuyển slide · P tạm dừng · F toàn màn hình · M tắt tiếng
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
