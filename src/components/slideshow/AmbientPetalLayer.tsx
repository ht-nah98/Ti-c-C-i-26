"use client";

import { PetalIcon } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/icons";

interface Petal {
  left: number;
  size: number;
  color: string;
  driftX: number;
  duration: number;
  delay: number;
}

/**
 * Giá trị cố định (không dùng Math.random) để server và client khớp nhau.
 * Cánh hoa rơi rất chậm và rất mờ — chỉ đủ để màn hình không chết cứng,
 * không được hút mắt khỏi chữ.
 */
const PETALS: Petal[] = [
  { left: 6, size: 22, color: "#c9a97e", driftX: 70, duration: 34, delay: -5 },
  { left: 17, size: 16, color: "#b89b78", driftX: -50, duration: 42, delay: -19 },
  { left: 29, size: 26, color: "#918077", driftX: 90, duration: 38, delay: -11 },
  { left: 41, size: 18, color: "#c9a97e", driftX: -70, duration: 46, delay: -27 },
  { left: 54, size: 24, color: "#b89b78", driftX: 60, duration: 36, delay: -8 },
  { left: 66, size: 15, color: "#918077", driftX: -85, duration: 44, delay: -22 },
  { left: 78, size: 27, color: "#c9a97e", driftX: 75, duration: 40, delay: -14 },
  { left: 90, size: 19, color: "#b89b78", driftX: -60, duration: 48, delay: -31 },
];

/** Lớp cánh hoa nền, nằm dưới mọi slide */
export function AmbientPetalLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-40px",
            color: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            ["--drift-x" as string]: `${p.driftX}px`,
            ["--drift-y" as string]: "115vh",
            animation: `petal-drift ${p.duration}s linear ${p.delay}s infinite`,
            // Cánh hoa chạy suốt cả buổi nên tách layer hẳn một lần, tránh
            // việc chúng buộc trình duyệt vẽ lại nền mỗi khung hình
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          <PetalIcon className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
