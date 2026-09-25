"use client";

import { useEffect, useState } from "react";
import { wishes as pinnedWishes } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/data";

export interface SlideshowWish {
  name: string;
  message: string;
}

interface ApiWish {
  uuid: string;
  name: string;
  comment: string;
  created_at: string;
}

/**
 * Lời chúc dài hơn ngưỡng này được chiếu riêng một màn thay vì chen ba thẻ
 * cạnh nhau — chữ đủ lớn để đọc từ cuối phòng tiệc.
 */
export const NGUONG_DAI = 320;

/** Lời chúc đính sẵn trong thiệp — luôn có, dùng khi chưa nối được database */
const FALLBACK: SlideshowWish[] = pinnedWishes.map((w) => ({
  name: w.name,
  message: w.message,
}));

export interface WishPool {
  /** Lời chúc ngắn — xếp 3 thẻ một màn */
  ngan: SlideshowWish[];
  /** Lời chúc dài — mỗi lời một màn riêng */
  dai: SlideshowWish[];
}

/**
 * Lấy lời chúc khách đã gửi qua thiệp để chiếu lên màn hình.
 *
 * Gọi đúng endpoint mà thiệp dùng (`/api/loi-chuc?per=100`) nên mọi lời
 * chúc đang hiện trên thiệp đều lên slideshow, mới nhất trước.
 *
 * Làm mới mỗi 5 phút — hôm cưới khách vẫn gửi lời chúc trong lúc slideshow
 * đang chạy, vòng sau sẽ có thêm lời chúc mới mà không cần tải lại trang.
 *
 * Không có mạng hoặc chưa cấu hình database thì giữ lời chúc đính sẵn,
 * slide lời chúc không bao giờ trống.
 */
export function useWishes(): WishPool {
  const [items, setItems] = useState<SlideshowWish[]>(FALLBACK);

  useEffect(() => {
    let huy = false;

    async function tai() {
      try {
        const res = await fetch("/api/loi-chuc?per=100", { cache: "no-store" });
        if (!res.ok) return;

        const json = (await res.json()) as { data?: { lists?: ApiWish[] } };
        const tuKhach = (json.data?.lists ?? [])
          .map<SlideshowWish>((w) => ({
            name: w.name,
            message: w.comment.trim(),
          }))
          // Chỉ bỏ lời chúc rỗng — lời chúc dài vẫn được chiếu, ở màn riêng
          .filter((w) => w.message.length > 0);

        if (!huy && tuKhach.length > 0) {
          setItems([...tuKhach, ...FALLBACK]);
        }
      } catch {
        // Giữ nguyên lời chúc đính sẵn
      }
    }

    void tai();
    const id = setInterval(() => void tai(), 5 * 60 * 1000);

    return () => {
      huy = true;
      clearInterval(id);
    };
  }, []);

  return {
    ngan: items.filter((w) => w.message.length <= NGUONG_DAI),
    dai: items.filter((w) => w.message.length > NGUONG_DAI),
  };
}
