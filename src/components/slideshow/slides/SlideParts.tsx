"use client";

import { createContext, useContext } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Cho biết cây thành phần bên dưới thuộc lớp slide đang rời đi.
 *
 * Lớp rời đi cần hiển thị y nguyên trạng thái cuối cùng của nó — mọi
 * animation "vào" phải tắt, nếu không chúng chạy lại từ đầu và gây nháy.
 */
const LeavingContext = createContext(false);

export function LeavingProvider({ children }: { children: ReactNode }) {
  return (
    <LeavingContext.Provider value={true}>{children}</LeavingContext.Provider>
  );
}

export function useIsLeaving(): boolean {
  return useContext(LeavingContext);
}

const BASE =
  "/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2";

/** Ảnh cưới bản đầy đủ — slideshow chiếu màn lớn nên luôn dùng bản full */
export function photoSrc(name: string): string {
  return `${BASE}/images/couple/full/${name}.jpg`;
}

export function themeSrc(name: string): string {
  return `${BASE}/images/theme/${name}`;
}

/**
 * Bọc một dòng chữ để nó nổi lên từ dưới. `index` tạo độ trễ nối tiếp
 * giữa các dòng — mắt khách được dẫn xuống theo đúng thứ tự đọc thay vì
 * bị dội cả khối chữ cùng lúc.
 */
export function FadeUp({
  children,
  index = 0,
  delay = 0,
  duration = 1,
  className,
  style,
}: {
  children: ReactNode;
  index?: number;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const leaving = useIsLeaving();

  /**
   * Slide đang rời đi thì khối chữ đứng yên ở trạng thái đã hiện đầy đủ,
   * KHÔNG chạy lại animation vào.
   *
   * React dựng lại DOM mỗi lần chuyển slide (thuộc tính `key` đổi), nên
   * nếu vẫn khai báo `slide-text-in`, animation khởi động lại từ đầu: chữ
   * nhảy về opacity 0, hiện lên lần nữa, rồi mới bị lớp ngoài kéo đi. Đó
   * là cú "nháy" thấy được ở cuối mỗi slide.
   */
  if (leaving) {
    return (
      <div className={className} style={{ opacity: 1, ...style }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        opacity: 0,
        /**
         * Stagger 0.11s: dẫn mắt xuống theo thứ tự đọc, đồng thời đủ nhanh
         * để cả khối chữ kịp đứng yên trước khi slide bắt đầu rời đi.
         */
        animation: `slide-text-in ${duration}s cubic-bezier(0.22, 0.61, 0.36, 1) ${
          delay + index * 0.11
        }s forwards`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Ảnh nền có hiệu ứng Ken Burns. Hướng phóng đổi luân phiên theo `variant`
 * để hai slide liền nhau không chuyển động giống hệt nhau.
 */
export function KenBurnsImage({
  src,
  seconds,
  variant = 0,
  className = "",
  objectPosition = "center",
}: {
  src: string;
  seconds: number;
  variant?: number;
  className?: string;
  objectPosition?: string;
}) {
  const animation = variant % 2 === 0 ? "ken-burns-in" : "ken-burns-out";
  const leaving = useIsLeaving();

  return (
    <img
      src={src}
      alt=""
      className={`h-full w-full object-cover ${className}`}
      style={{
        objectPosition,
        /**
         * Chạy dài hơn hẳn thời lượng slide (cộng 8s) và dùng `linear`.
         *
         * Nếu animation kết thúc trong lúc slide còn đang mờ đi, mắt bắt
         * được khoảnh khắc ảnh dừng phựt. Một lần chuyển cảnh nay mất tới
         * 3.1s, nên phần cộng thêm phải lớn hơn con số đó. `ease-out` cũng
         * bị bỏ vì nó giảm tốc dần — chuyển động chậm lại rồi mới dừng còn
         * lộ hơn; `linear` giữ tốc độ đều nên không ai nhận ra điểm kết thúc.
         */
        // Lớp rời đi giữ nguyên khung hình cuối, không chạy lại Ken Burns
        animation: leaving
          ? "none"
          : `${animation} ${seconds + 8}s linear forwards`,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    />
  );
}

/** Dấu ❦ ngăn cách, dùng lại từ thiệp */
export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif text-[rgb(145,128,119)] ${className}`}
      aria-hidden
    >
      ❦
    </span>
  );
}

/** Vạch kẻ mảnh giãn ra từ giữa — gạch chân tiêu đề */
export function GrowRule({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const leaving = useIsLeaving();

  // Lớp rời đi: giữ vạch ở trạng thái đã giãn hết, không vẽ lại
  if (leaving) {
    return (
      <span
        aria-hidden
        className={`block h-px bg-[rgba(124,106,96,0.45)] ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`block h-px bg-[rgba(124,106,96,0.45)] ${className}`}
      style={{
        transform: "scaleX(0)",
        animation: `rule-grow 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s forwards`,
      }}
    />
  );
}
