"use client";

import type { ClosingSlide } from "../types";
import { FadeUp, Fleuron, themeSrc } from "./SlideParts";

/** Slide lời cảm ơn — các dòng chữ nghiêng hiện nối tiếp nhau trên nền giấy */
export function ClosingSlideView({ slide }: { slide: ClosingSlide }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden px-[10vw]"
      style={{ backgroundColor: "#fdf4ee" }}
    >
      <img
        src={themeSrc("paper.webp")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      />

      <div className="relative z-10 flex max-w-[68vw] flex-col items-center text-center">
        <FadeUp index={0}>
          <Fleuron className="text-[clamp(20px,3.08vw,118px)]" />
        </FadeUp>

        {slide.lines.map((line, i) => (
          <FadeUp key={line} index={i + 1} duration={1.25} className="mt-[3.2vh]">
            <p
              className="font-serif italic"
              style={{
                fontSize: "clamp(20px,3.5vw,134px)",
                fontWeight: 300,
                lineHeight: 1.72,
                color: "rgb(124,106,96)",
                textWrap: "pretty",
              }}
            >
              {line}
            </p>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
