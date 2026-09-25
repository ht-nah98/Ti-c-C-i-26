"use client";

import type { ChapterSlide } from "../types";
import {
  FadeUp,
  GrowRule,
  KenBurnsImage,
  photoSrc,
  useIsLeaving,
} from "./SlideParts";

/**
 * Bìa mở đầu mỗi chương. Ngày tháng lộ dần từ trái sang — hiệu ứng khác
 * hẳn các slide chữ để khách nhận ra ngay "đang sang phần mới".
 */
export function ChapterSlideView({ slide }: { slide: ChapterSlide }) {
  const leaving = useIsLeaving();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {slide.photo ? (
        <>
          <div className="absolute inset-0">
            <KenBurnsImage
              src={photoSrc(slide.photo)}
              seconds={slide.seconds}
              variant={1}
              objectPosition="center 22%"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(40,32,28,0.62) 0%, rgba(40,32,28,0.48) 50%, rgba(40,32,28,0.68) 100%)",
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 flex flex-col items-center px-[8vw] text-center">
        {/* Ngày tháng lộ dần từ trái sang phải */}
        <div
          style={
            // Lớp rời đi: ngày tháng đã lộ hết, không vẽ lại từ đầu
            leaving
              ? { clipPath: "inset(0 0 0 0)" }
              : {
                  clipPath: "inset(0 100% 0 0)",
                  animation:
                    "reveal-wipe 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s forwards",
                }
          }
        >
          <p
            style={{
              fontFamily: "var(--font-nautigal)",
              fontSize: "clamp(44px,7vw,269px)",
              lineHeight: 1.1,
              color: "#ffffff",
              textShadow: "0 3px 22px rgba(0,0,0,0.5)",
            }}
          >
            {slide.date}
          </p>
        </div>

        <div className="mt-[2vh] w-[min(40vw,520px)]">
          <GrowRule delay={0.9} className="bg-[rgba(255,255,255,0.6)]" />
        </div>

        <FadeUp delay={1.1} duration={1.2} className="mt-[3vh]">
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(24px,4.48vw,172px)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "0.02em",
              color: "#ffffff",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
              maxWidth: "62vw",
            }}
          >
            {slide.title}
          </h2>
        </FadeUp>
      </div>
    </div>
  );
}
