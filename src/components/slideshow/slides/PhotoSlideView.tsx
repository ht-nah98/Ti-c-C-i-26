"use client";

import type { PhotoSlide } from "../types";
import { FadeUp, KenBurnsImage, photoSrc, useIsLeaving } from "./SlideParts";

/**
 * Slide album.
 *
 * Bộ ảnh cưới gần như toàn ảnh dọc 2:3 (30/34 tấm), trong khi màn chiếu
 * là 16:9 ngang. Nhét một ảnh dọc vào khung ngang rồi `object-cover` sẽ
 * phóng ảnh theo chiều rộng và cắt cụt mất chủ thể — mặt cô dâu chú rể
 * rơi xuống mép dưới, phần lớn màn hình chỉ còn phông nền.
 *
 * Nên ảnh dọc được xếp 2-3 tấm cạnh nhau, mỗi tấm nằm trong khung dọc
 * đúng tỉ lệ của nó. Ảnh không bị phóng quá cỡ, chủ thể luôn nguyên vẹn,
 * và một màn khoe được nhiều ảnh hơn. Chỉ ảnh ngang mới phủ toàn màn.
 */
export function PhotoSlideView({
  slide,
  index,
}: {
  slide: PhotoSlide;
  index: number;
}) {
  const fullBleed = slide.orientation === "landscape";

  if (fullBleed) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#2a2320]">
        <div className="absolute inset-0">
          <KenBurnsImage
            src={photoSrc(slide.photos[0])}
            seconds={slide.seconds}
            variant={index}
            objectPosition="center center"
          />
        </div>
        <PageEffects />
        <Caption slide={slide} />
      </div>
    );
  }

  // Ảnh dọc: mỗi tấm một khung 2:3, xếp ngang, cách nhau một khoảng thở
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1f1a17" }}
    >
      <div className="flex h-full w-full items-center justify-center gap-[2vw] px-[3vw] py-[6vh]">
        {slide.photos.map((photo, i) => (
          <FadeUp
            key={photo}
            index={i}
            delay={0.35}
            duration={1.1}
            className="h-full"
            style={{
              // Khung giữ đúng tỉ lệ ảnh dọc, cao hết chiều màn hình
              aspectRatio: "2 / 3",
              height: "100%",
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[6px]"
              style={{
                boxShadow:
                  "0 18px 46px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              <KenBurnsImage
                src={photoSrc(photo)}
                seconds={slide.seconds}
                variant={index + i}
                // Ảnh chân dung: giữ trọng tâm hơi cao để mặt người luôn nằm trong khung
                objectPosition="center 38%"
              />
            </div>
          </FadeUp>
        ))}
      </div>

      <PageEffects />
      <Caption slide={slide} />
    </div>
  );
}

/** Vệt sáng và bóng gáy sổ — phụ trợ cho hiệu ứng lật trang */
function PageEffects() {
  const leaving = useIsLeaving();

  // Lớp rời đi không quét sáng lại — hiệu ứng này chỉ thuộc về lúc trang vào
  if (leaving) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[12vw]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          opacity: 0,
          animation: "spine-shadow 1.5s ease-out forwards",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[26%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)",
          animation: "page-sheen 1.5s ease-out forwards",
        }}
      />
    </>
  );
}

function Caption({ slide }: { slide: PhotoSlide }) {
  if (!slide.caption) return null;

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,14,0) 0%, rgba(20,16,14,0.78) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-[5vh] flex justify-center">
        <FadeUp index={0} duration={1.2} delay={0.6}>
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 600,
              fontSize: "clamp(16px, 1.9vw, 73px)",
              letterSpacing: "0.44em",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
            }}
          >
            {slide.caption}
          </p>
        </FadeUp>
      </div>
    </>
  );
}
