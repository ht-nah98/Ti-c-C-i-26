"use client";

import type { TitleSlide } from "../types";
import { FadeUp, Fleuron, GrowRule, KenBurnsImage, photoSrc } from "./SlideParts";

/**
 * Slide mở đầu và slide kết. Có ảnh thì phủ toàn màn kèm lớp tối nhẹ để
 * chữ trắng luôn đọc được; không ảnh thì nền kem chữ nâu như thiệp giấy.
 */
export function TitleSlideView({ slide }: { slide: TitleSlide }) {
  const onPhoto = Boolean(slide.photo);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {slide.photo ? (
        <>
          <div className="absolute inset-0">
            <KenBurnsImage
              src={photoSrc(slide.photo)}
              seconds={slide.seconds}
              variant={0}
              objectPosition="center 22%"
            />
          </div>
          {/* Lớp phủ tối để chữ trắng nổi trên mọi ảnh */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(40,32,28,0.55) 0%, rgba(40,32,28,0.32) 45%, rgba(40,32,28,0.62) 100%)",
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 flex flex-col items-center px-[6vw] text-center">
        {slide.eyebrow ? (
          <FadeUp index={0}>
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 600,
                fontSize: "clamp(14px, 1.5vw, 58px)",
                letterSpacing: "0.42em",
                color: onPhoto ? "rgba(255,255,255,0.88)" : "rgb(130,119,113)",
              }}
            >
              {slide.eyebrow}
            </p>
          </FadeUp>
        ) : null}

        <FadeUp index={1} className="mt-[2vh]">
          <h1
            style={{
              fontFamily: "var(--font-nautigal)",
              fontSize: "clamp(56px, 11vw, 422px)",
              lineHeight: 1.05,
              color: onPhoto ? "#ffffff" : "rgb(124,106,96)",
              textShadow: onPhoto ? "0 4px 28px rgba(0,0,0,0.45)" : "none",
            }}
          >
            {slide.names}
          </h1>
        </FadeUp>

        <FadeUp index={2} className="mt-[1.5vh] w-[min(46vw,560px)]">
          <GrowRule
            delay={0.6}
            className={onPhoto ? "bg-[rgba(255,255,255,0.6)]" : ""}
          />
        </FadeUp>

        {slide.subtitle ? (
          <FadeUp index={3} className="mt-[2.4vh]">
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(20px, 2.4vw, 92px)",
                fontWeight: 300,
                letterSpacing: "0.12em",
                color: onPhoto ? "rgba(255,255,255,0.94)" : "rgb(124,106,96)",
                textShadow: onPhoto ? "0 2px 16px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {slide.subtitle}
            </p>
          </FadeUp>
        ) : null}

        {!onPhoto ? (
          <FadeUp index={4} className="mt-[2vh]">
            <Fleuron className="text-[clamp(18px,2vw,77px)]" />
          </FadeUp>
        ) : null}

        {slide.footnote ? (
          <FadeUp index={5} className="mt-[1.6vh]">
            <p
              className="font-serif italic"
              style={{
                fontSize: "clamp(15px, 1.7vw, 65px)",
                fontWeight: 300,
                color: onPhoto
                  ? "rgba(255,255,255,0.82)"
                  : "rgb(145,128,119)",
              }}
            >
              {slide.footnote}
            </p>
          </FadeUp>
        ) : null}
      </div>
    </div>
  );
}
