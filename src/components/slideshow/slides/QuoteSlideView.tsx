"use client";

import type { QuoteSlide } from "../types";
import { FadeUp, Fleuron } from "./SlideParts";

/**
 * Slide trích dẫn — một câu đứng giữa màn trên nền kem, không ảnh.
 * Dùng cho câu mở đầu và cho đoạn kết câu chuyện: khoảng lặng giữa
 * những màn dày chữ, để câu đắt nhất được đứng một mình.
 */
export function QuoteSlideView({ slide }: { slide: QuoteSlide }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-[10vw]">
      <div className="flex max-w-[64vw] flex-col items-center text-center">
        <FadeUp index={0}>
          <Fleuron className="text-[clamp(20px,3.08vw,118px)]" />
        </FadeUp>

        <FadeUp index={1} className="mt-[3vh]" duration={1.3}>
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(24px,4.2vw,161px)",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "rgb(124,106,96)",
            }}
          >
            “{slide.text}”
          </p>
        </FadeUp>

        <FadeUp index={2} className="mt-[3vh]">
          <Fleuron className="text-[clamp(20px,3.08vw,118px)]" />
        </FadeUp>
      </div>
    </div>
  );
}
