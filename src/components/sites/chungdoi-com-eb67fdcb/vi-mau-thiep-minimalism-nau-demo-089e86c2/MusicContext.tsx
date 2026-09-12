"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface MusicControl {
  /** Có nguồn nào đang yêu cầu tắt nhạc nền không (ví dụ: video đang phát) */
  ducked: boolean;
  /** Yêu cầu tạm tắt nhạc nền. Trả về hàm huỷ yêu cầu (gọi nhiều lần vẫn an toàn). */
  requestDuck: () => () => void;
}

const MusicContext = createContext<MusicControl | null>(null);

const EMPTY: MusicControl = { ducked: false, requestDuck: () => () => {} };

/**
 * Cho phép thành phần khác (video) tạm tắt nhạc nền mà không cần biết
 * gì về trình phát. Dùng bộ đếm để nhiều nguồn cùng yêu cầu vẫn đúng.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const requestDuck = useCallback(() => {
    setCount((n) => n + 1);

    let done = false;
    return () => {
      if (done) return;
      done = true;
      setCount((n) => Math.max(0, n - 1));
    };
  }, []);

  const value = useMemo(
    () => ({ ducked: count > 0, requestDuck }),
    [count, requestDuck],
  );

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export function useMusicControl(): MusicControl {
  return useContext(MusicContext) ?? EMPTY;
}
