"use client";

import type { StorySlide } from "../types";
import { FadeUp, GrowRule, KenBurnsImage, photoSrc, themeSrc } from "./SlideParts";

/**
 * Slide đoạn văn câu chuyện — ảnh chiếm một nửa màn, chữ nửa còn lại.
 * Ảnh đổi bên liên tục giữa các slide để mắt khách không đứng yên một chỗ.
 *
 * Cỡ chữ tính theo vw nên trên màn LED lớn chữ vẫn to; đoạn dài tự thu
 * nhỏ một nhịp để không bao giờ tràn ra ngoài khung.
 */
export function StorySlideView({
  slide,
  index,
}: {
  slide: StorySlide;
  index: number;
}) {
  const photoLeft = slide.side === "left";
  /**
   * Cỡ chữ đã tăng để đọc được từ cuối phòng tiệc, nên ngưỡng chuyển sang
   * cỡ nhỏ phải hạ xuống theo: ở 58px, đoạn quá 230 ký tự bắt đầu chạm đáy
   * khung. Đoạn dài nhất trong truyện là 290 ký tự.
   */
  const isLong = slide.text.length > 230;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "#fdf4ee" }}
    >
      {/*
        Nền giấy.

        KHÔNG dùng `mix-blend-multiply` ở đây. Blend mode buộc trình duyệt
        đọc ngược pixel của mọi lớp nằm dưới để trộn màu, nên nó không thể
        cache lớp này thành bitmap trên GPU — mọi `will-change` đặt ở ngoài
        đều thành vô nghĩa, và mỗi khung hình phải vẽ lại toàn màn. Đó
        chính là lý do riêng các slide câu chuyện bị khựng lúc chuyển cảnh,
        còn slide ảnh và slide trích dẫn thì mượt.

        Dùng ảnh mờ chồng lên nền kem cho ra sắc giấy gần như y hệt, mà lớp
        này tĩnh hoàn toàn nên GPU cache được.
      */}
      <img
        src={themeSrc("paper.webp")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      />

      <div
        className={`relative z-10 flex h-full w-full items-center ${
          photoLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Nửa ảnh */}
        <div className="relative h-full w-[46%] overflow-hidden">
          <KenBurnsImage
            src={photoSrc(slide.photo)}
            seconds={slide.seconds}
            variant={index}
            objectPosition={slide.focus ?? "center 35%"}
          />
          {/* Chuyển sắc mềm ở mép giáp chữ, tránh đường cắt cứng */}
          <div
            aria-hidden
            className="absolute inset-y-0 w-[18%]"
            style={{
              [photoLeft ? "right" : "left"]: 0,
              background: `linear-gradient(${
                photoLeft ? "90deg" : "270deg"
              }, rgba(255,247,243,0) 0%, rgba(255,247,243,0.92) 100%)`,
            }}
          />
        </div>

        {/* Nửa chữ */}
        <div className="flex h-full w-[54%] items-center px-[4.5vw]">
          <div className="w-full">
            {slide.chapter ? (
              <FadeUp index={0}>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 600,
                    fontSize: "clamp(12px,1.61vw,62px)",
                    letterSpacing: "0.34em",
                    color: "rgb(160,145,136)",
                  }}
                >
                  {slide.chapter}
                </p>
              </FadeUp>
            ) : null}

            {slide.chapter ? (
              <div className="mt-[1.4vh] w-[min(14vw,180px)]">
                <GrowRule delay={0.35} />
              </div>
            ) : null}

            <FadeUp
              index={slide.chapter ? 2 : 0}
              duration={1.25}
              className={slide.chapter ? "mt-[3vh]" : ""}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: isLong
                    ? "clamp(17px,2.69vw,103px)"
                    : "clamp(19px,3.02vw,116px)",
                  fontWeight: 300,
                  lineHeight: 1.78,
                  color: "rgb(107,91,82)",
                  textWrap: "pretty",
                }}
              >
                {slide.text}
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
