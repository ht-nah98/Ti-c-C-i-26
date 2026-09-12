"use client";

import { cn } from "@/lib/utils";
import { HeartIcon, PetalIcon } from "./icons";
import { asset, couple, weddingDate } from "./data";

interface CoverOverlayProps {
  onOpen: () => void;
  hidden?: boolean;
}

interface Petal {
  left: number;
  size: number;
  color: string;
  sway: number;
  duration: number;
  delay: number;
}

const PETALS: Petal[] = [
  { left: 2.5, size: 15.4, color: "#c9a97e", sway: 6.2, duration: 19.8, delay: -3.4 },
  { left: 8.1, size: 22.7, color: "#918077", sway: 11.5, duration: 26.3, delay: -17.9 },
  { left: 13.6, size: 17.9, color: "#b89b78", sway: 15.8, duration: 21.1, delay: -8.6 },
  { left: 19.4, size: 26.3, color: "#c9a97e", sway: 5.1, duration: 29.4, delay: -24.2 },
  { left: 26.2, size: 14.6, color: "#918077", sway: 18.9, duration: 18.5, delay: -1.7 },
  { left: 33.7, size: 20.2, color: "#b89b78", sway: 9.3, duration: 24.7, delay: -12.5 },
  { left: 40.9, size: 25.1, color: "#c9a97e", sway: 13.7, duration: 22.6, delay: -20.8 },
  { left: 47.3, size: 16.8, color: "#918077", sway: 7.6, duration: 27.9, delay: -6.3 },
  { left: 53.8, size: 23.4, color: "#b89b78", sway: 19.8, duration: 20.2, delay: -14.1 },
  { left: 60.5, size: 18.3, color: "#c9a97e", sway: 5.9, duration: 25.5, delay: -27.6 },
  { left: 66.9, size: 27.6, color: "#918077", sway: 12.4, duration: 18.9, delay: -9.8 },
  { left: 71.4, size: 15.9, color: "#b89b78", sway: 16.6, duration: 28.7, delay: -2.5 },
  { left: 77.8, size: 21.5, color: "#c9a97e", sway: 8.8, duration: 23.3, delay: -19.4 },
  { left: 82.8, size: 19.1, color: "#918077", sway: 7.8, duration: 24.6, delay: -19.9 },
  { left: 87.3, size: 24.8, color: "#b89b78", sway: 14.2, duration: 19.6, delay: -5.1 },
  { left: 90.6, size: 16.3, color: "#c9a97e", sway: 10.7, duration: 26.8, delay: -22.3 },
  { left: 93.9, size: 22.9, color: "#918077", sway: 17.5, duration: 21.9, delay: -11.2 },
  { left: 96, size: 14.2, color: "#b89b78", sway: 6.5, duration: 29.9, delay: -16.7 },
];

export function CoverOverlay({ onOpen, hidden = false }: CoverOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#efe2d8] transition-opacity duration-700",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        {PETALS.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: "-30px",
              bottom: "auto",
              color: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              ["--sway" as string]: `${p.sway}px`,
              animation: `ambient-fall ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            <PetalIcon className="h-full w-full" />
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div className="absolute -top-7 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[rgb(124,106,96)]">
            <HeartIcon className="h-7 w-7 text-white" />
          </div>

          <div className="relative rounded-lg bg-[#FFF7F3] shadow-lg">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img
                src={asset.theme("flower2-decoration.webp")}
                alt=""
                className="pointer-events-none absolute -left-10 top-0 h-40 w-auto max-w-none opacity-90 md:-left-14 md:h-72"
              />
              <img
                src={asset.theme("flower2-decoration.webp")}
                alt=""
                className="pointer-events-none absolute -right-10 top-0 h-40 w-auto max-w-none -scale-x-100 opacity-90 md:-right-14 md:h-72"
              />
            </div>

            <div className="relative z-10 px-6 pb-14 pt-28 text-center md:pb-8 md:pt-24">
              <h1 className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl">
                <span className="font-[family-name:var(--font-eb-garamond)] text-[36px] text-[rgb(124,106,96)]">
                  {couple.groom.short}
                </span>
                <span className="font-serif text-[20px] text-[rgb(124,106,96)]">&amp;</span>
                <span className="font-[family-name:var(--font-eb-garamond)] text-[36px] text-[rgb(124,106,96)]">
                  {couple.bride.short}
                </span>
              </h1>
              <span className="block text-[14px] text-[rgb(124,106,96)]">❦</span>
              <p className="font-[family-name:var(--font-lora)] text-[18px] text-[rgba(124,106,96,0.72)]">
                {weddingDate.pretty}
              </p>
              <p className="font-[family-name:var(--font-lora)] text-[18px] text-[rgba(124,106,96,0.72)]">
                Thân Mời
              </p>

              <button
                type="button"
                onClick={onOpen}
                className="relative mt-6 rounded-full bg-[rgb(124,106,96)] px-8 py-2.5 font-[family-name:var(--font-lora)] text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] sm:font-medium"
                style={{ fontSize: "18px" }}
              >
                Mở thiệp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
