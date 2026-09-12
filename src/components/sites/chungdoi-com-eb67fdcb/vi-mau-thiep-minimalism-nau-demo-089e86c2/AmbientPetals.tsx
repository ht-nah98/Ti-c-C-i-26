import { PetalIcon } from "./icons";

interface Petal {
  left: number;
  size: number;
  color: string;
  sway: number;
  duration: number;
  delay: number;
  rise?: boolean;
}

/**
 * Giá trị cố định (không dùng Math.random khi render) để server và client
 * khớp nhau, tránh hydration mismatch. Phân bố mô phỏng site gốc:
 * left rải đều, size 14–28px, 3 màu luân phiên, delay âm để hoa đã rơi
 * sẵn giữa chừng ngay khi trang load.
 */
const PETALS: Petal[] = [
  { left: 4.2, size: 17.4, color: "#c9a97e", sway: 12.4, duration: 27.1, delay: -6.2 },
  { left: 11.8, size: 22.6, color: "#918077", sway: 6.8, duration: 21.4, delay: -17.9, rise: true },
  { left: 19.3, size: 15.1, color: "#b89b78", sway: 16.2, duration: 29.8, delay: -3.4 },
  { left: 26.7, size: 25.3, color: "#c9a97e", sway: 9.1, duration: 23.6, delay: -21.5 },
  { left: 34.1, size: 18.9, color: "#918077", sway: 14.7, duration: 26.2, delay: -11.8, rise: true },
  { left: 41.6, size: 14.2, color: "#b89b78", sway: 7.5, duration: 19.7, delay: -15.3 },
  { left: 49.0, size: 27.8, color: "#c9a97e", sway: 18.3, duration: 30.4, delay: -8.7 },
  { left: 56.4, size: 16.5, color: "#918077", sway: 10.9, duration: 22.8, delay: -24.1, rise: true },
  { left: 63.9, size: 23.7, color: "#b89b78", sway: 5.6, duration: 28.3, delay: -13.6 },
  { left: 71.3, size: 19.8, color: "#c9a97e", sway: 15.8, duration: 20.5, delay: -4.9 },
  { left: 78.8, size: 14.9, color: "#918077", sway: 8.4, duration: 25.7, delay: -19.2, rise: true },
  { left: 86.2, size: 26.1, color: "#b89b78", sway: 13.1, duration: 24.3, delay: -9.5 },
  { left: 93.6, size: 20.4, color: "#c9a97e", sway: 11.6, duration: 18.9, delay: -14.7 },
  { left: 97.1, size: 16.8, color: "#918077", sway: 17.5, duration: 29.1, delay: -26.3, rise: true },
];

/**
 * Lớp cánh hoa bay nền cho phần nội dung thiệp.
 * Dùng cả hai keyframes gốc: ambient-fall (rơi xuống) và ambient-rise (bay lên).
 */
export function AmbientPetals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            ...(p.rise
              ? { bottom: "-30px", top: "auto" }
              : { top: "-30px", bottom: "auto" }),
            color: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.5,
            ["--sway" as string]: `${p.sway}px`,
            animation: `${p.rise ? "ambient-rise" : "ambient-fall"} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <PetalIcon className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
