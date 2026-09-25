"use client";

import type { ReactNode } from "react";
import type { WishesSlide } from "../types";
import type { SlideshowWish, WishPool } from "../useWishes";
import { FadeUp, Fleuron, GrowRule, themeSrc } from "./SlideParts";

/**
 * Bề rộng tối đa một thẻ, theo số lời chúc trên màn.
 *
 * Càng ít cột thì thẻ càng rộng và chữ càng to — trên màn LED nhìn từ cuối
 * phòng tiệc, hai cột đọc dễ hơn hẳn ba cột.
 */
const BE_RONG_THE: Record<number, number> = { 1: 58, 2: 42, 3: 30 };

/** Cỡ chữ lời chúc, to dần khi số cột giảm */
const CO_CHU_THE: Record<number, string> = {
  1: "clamp(18px,3.1vw,119px)",
  2: "clamp(16px,2.5vw,96px)",
  3: "clamp(14px,1.99vw,76px)",
};

/** Cỡ chữ tên người gửi, đi kèm cỡ chữ lời chúc */
const CO_CHU_TEN: Record<number, string> = {
  1: "clamp(15px,2.3vw,88px)",
  2: "clamp(14px,1.9vw,73px)",
  3: "clamp(13px,1.75vw,67px)",
};

/**
 * Slide lời chúc — lấy từ chính database mà thiệp dùng, nên mọi lời chúc
 * khách đã gửi trên thiệp đều được chiếu lên đây.
 *
 * Hai bố cục: lời chúc ngắn xếp ba thẻ giấy cạnh nhau; lời chúc dài được
 * đứng riêng cả màn với cỡ chữ lớn, trang trọng như một lá thư.
 *
 * Chưa nối được database thì đã có 3 lời chúc đính sẵn trong data.ts làm
 * nền, nên slide này không bao giờ trống.
 */
export function WishesSlideView({
  slide,
  wishes,
}: {
  slide: WishesSlide;
  wishes: WishPool;
}) {
  const nguon = slide.layout === "feature" ? wishes.dai : wishes.ngan;

  // Không có lời chúc thuộc loại này thì mượn loại kia, để slide không trống
  const danhSach =
    nguon.length > 0
      ? nguon
      : slide.layout === "feature"
        ? wishes.ngan
        : wishes.dai;

  if (danhSach.length === 0) return <Backdrop heading={slide.heading} />;

  // Lấy vòng tròn để các slide lời chúc không hiện trùng nhau
  const picked: SlideshowWish[] = [];
  for (let i = 0; i < Math.min(slide.count, danhSach.length); i += 1) {
    picked.push(danhSach[(slide.offset + i) % danhSach.length]);
  }

  return (
    <Backdrop heading={slide.heading}>
      {slide.layout === "feature" ? (
        <FeatureWish wish={picked[0]} />
      ) : (
        <div className="mt-[4vh] flex w-full max-w-[92vw] items-stretch justify-center gap-[2.5vw]">
          {picked.map((wish, i) => (
            <FadeUp
              key={`${wish.name}-${i}`}
              index={3 + i}
              duration={1.15}
              className="flex-1"
              style={{ maxWidth: `${BE_RONG_THE[picked.length] ?? 42}vw` }}
            >
              <WishCard
                wish={wish}
                tilt={(i - (picked.length - 1) / 2) * 0.9}
                soCot={picked.length}
              />
            </FadeUp>
          ))}
        </div>
      )}
    </Backdrop>
  );
}

/** Một lời chúc dài đứng riêng cả màn, như một lá thư đặt giữa trang */
function FeatureWish({ wish }: { wish: SlideshowWish }) {
  // Lời chúc càng dài thì chữ nhỏ đi một nhịp, để luôn vừa trong màn
  const ratDai = wish.message.length > 520;

  return (
    <FadeUp index={3} duration={1.3} className="mt-[4vh] w-full max-w-[72vw]">
      <figure
        className="rounded-[12px] border px-[4vw] py-[5vh]"
        style={{
          borderColor: "rgba(124,106,96,0.22)",
          backgroundColor: "rgba(255,255,255,0.66)",
          boxShadow: "0 10px 34px rgba(124,106,96,0.16)",
        }}
      >
        <blockquote
          className="text-center font-serif italic"
          style={{
            fontSize: ratDai
              ? "clamp(15px,2.17vw,83px)"
              : "clamp(17px,2.59vw,99px)",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgb(107,91,82)",
            textWrap: "pretty",
          }}
        >
          “{wish.message}”
        </blockquote>

        {wish.name ? (
          <figcaption
            className="mt-[3vh] text-center font-serif"
            style={{
              fontSize: "clamp(14px,1.96vw,75px)",
              fontWeight: 600,
              color: "rgb(145,128,119)",
            }}
          >
            — {wish.name}
          </figcaption>
        ) : null}
      </figure>
    </FadeUp>
  );
}

/** Thẻ giấy chứa một lời chúc ngắn */
function WishCard({
  wish,
  tilt,
  soCot,
}: {
  wish: SlideshowWish;
  tilt: number;
  soCot: number;
}) {
  return (
    <figure
      className="flex h-full flex-col justify-between rounded-[10px] border px-[2vw] py-[3vh]"
      style={{
        borderColor: "rgba(124,106,96,0.22)",
        backgroundColor: "rgba(255,255,255,0.62)",
        boxShadow: "0 6px 22px rgba(124,106,96,0.12)",
        // Nghiêng nhẹ so le như thiệp giấy xếp trên bàn
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <blockquote
        className="font-serif italic"
        style={{
          fontSize: CO_CHU_THE[soCot] ?? CO_CHU_THE[3],
          fontWeight: 300,
          lineHeight: 1.72,
          color: "rgb(107,91,82)",
          textWrap: "pretty",
        }}
      >
        “{wish.message}”
      </blockquote>

      {wish.name ? (
        <figcaption
          className="mt-[2.4vh] font-serif"
          style={{
            fontSize: CO_CHU_TEN[soCot] ?? CO_CHU_TEN[3],
            fontWeight: 600,
            color: "rgb(145,128,119)",
          }}
        >
          — {wish.name}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Nền giấy và tiêu đề dùng chung cho cả hai bố cục */
function Backdrop({
  heading,
  children,
}: {
  heading: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "#fdf4ee" }}
    >
      <img
        src={themeSrc("paper.webp")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-[6vw]">
        <FadeUp index={0}>
          <Fleuron className="text-[clamp(18px,2.8vw,108px)]" />
        </FadeUp>

        <FadeUp index={1} className="mt-[1.6vh]">
          <h2
            className="text-center font-serif uppercase"
            style={{
              fontSize: "clamp(18px,2.94vw,113px)",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgb(124,106,96)",
            }}
          >
            {heading}
          </h2>
        </FadeUp>

        <FadeUp index={2} className="mt-[1.8vh] w-[min(30vw,420px)]">
          <GrowRule delay={0.5} />
        </FadeUp>

        {children}
      </div>
    </div>
  );
}
