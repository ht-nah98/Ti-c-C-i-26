"use client";

import { MusicNoteIcon } from "./icons";
import { useMusicControl } from "./MusicContext";
import { useYouTubeAudio } from "@/components/shared/YouTubeAudio";

interface MusicPlayerProps {
  /** Bật nhạc khi khách mở thiệp */
  autoStart: boolean;
}

/**
 * Nhạc nền phát qua trình phát YouTube nhúng (xem YouTubeAudio).
 * Nút bật/tắt nổi ở góc phải, đĩa nhạc quay khi đang phát.
 *
 * Trình duyệt chặn autoplay có tiếng khi chưa có tương tác, nên nhạc
 * chỉ bắt đầu sau khi khách bấm "Mở thiệp" — đó chính là tương tác hợp lệ.
 */
export function MusicPlayer({ autoStart }: MusicPlayerProps) {
  const { ducked } = useMusicControl();

  const {
    element: khungNhac,
    playing,
    toggle,
  } = useYouTubeAudio({ autoStart, volume: 40, ducked });

  return (
    <>
      {khungNhac}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
        title={playing ? "Đang phát nhạc nền" : "Bật nhạc nền"}
        className="fixed bottom-5 right-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-[rgb(124,106,96)] text-white shadow-lg transition-transform hover:scale-105 md:bottom-7 md:right-7"
      >
        <MusicNoteIcon
          className="h-[18px] w-[18px]"
          style={
            playing ? { animation: "spin 4s linear infinite" } : { opacity: 0.55 }
          }
        />
        {/* Vạch chéo khi đang tắt */}
        {!playing ? (
          <span
            aria-hidden
            className="absolute h-[1.5px] w-6 rotate-45 rounded-full bg-white/80"
          />
        ) : null}
      </button>
    </>
  );
}
