"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Nhạc nền phát qua trình phát YouTube nhúng.
 *
 * Nhúng là cách YouTube cho phép phát nhạc trên trang khác — lượt xem vẫn
 * tính cho kênh gốc và tác giả vẫn nhận doanh thu. Không tải file về máy.
 *
 * Khung iframe ẩn hoàn toàn (1x1px, ngoài màn hình) vì ở đây chỉ cần tiếng.
 * Người xem điều khiển bằng nút nổi mà trang tự vẽ.
 */

/** Mã video YouTube, lấy từ phần `v=` trong đường dẫn */
export const MA_VIDEO = "1g7egvojTZs";

interface YouTubeAudioProps {
  /** Bắt đầu phát khi giá trị này thành true */
  autoStart: boolean;
  /** Âm lượng 0–100 */
  volume?: number;
  /** Báo cho bên ngoài biết nhạc đang phát hay đã dừng */
  onPlayingChange?: (playing: boolean) => void;
  /** Tạm tắt tiếng mà không dừng hẳn (dùng khi video câu chuyện chạy) */
  ducked?: boolean;
}

/** Kiểu tối thiểu của trình phát YouTube mà component này dùng tới */
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (v: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    cfg: Record<string, unknown>,
  ) => YTPlayer;
  PlayerState: { PLAYING: number; ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Nạp thư viện iframe của YouTube đúng một lần cho cả trang, dù có bao
 * nhiêu trình phát cùng gọi.
 */
let dangNap: Promise<void> | null = null;

function napThuVien(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (dangNap) return dangNap;

  dangNap = new Promise<void>((resolve) => {
    const truocDo = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      truocDo?.();
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return dangNap;
}

export function useYouTubeAudio({
  autoStart,
  volume = 40,
  onPlayingChange,
  ducked = false,
}: YouTubeAudioProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [sanSang, setSanSang] = useState(false);
  const [playing, setPlaying] = useState(false);
  /** Nhạc có đang phát trước khi bị video tắt tiếng hay không */
  const phatLaiSauDuck = useRef(false);

  const capNhatPlaying = useCallback(
    (v: boolean) => {
      setPlaying(v);
      onPlayingChange?.(v);
    },
    [onPlayingChange],
  );

  useEffect(() => {
    let huy = false;

    void napThuVien().then(() => {
      if (huy || !hostRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: MA_VIDEO,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          // Phát lại từ đầu khi hết bài — `playlist` là điều kiện để `loop` chạy
          loop: 1,
          playlist: MA_VIDEO,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (huy) return;
            playerRef.current?.setVolume(volume);
            setSanSang(true);
          },
          onStateChange: (e: { data: number }) => {
            if (huy || !window.YT) return;
            capNhatPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      huy = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // Chỉ dựng trình phát một lần; âm lượng đổi qua effect riêng bên dưới
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Bắt đầu phát khi trang báo đã sẵn sàng */
  useEffect(() => {
    if (!autoStart || !sanSang) return;
    playerRef.current?.setVolume(volume);
    playerRef.current?.playVideo();
  }, [autoStart, sanSang, volume]);

  /** Video câu chuyện phát thì tạm dừng nhạc, video dừng thì bật lại */
  useEffect(() => {
    if (!sanSang) return;
    const player = playerRef.current;
    if (!player) return;

    if (ducked) {
      if (playing) {
        phatLaiSauDuck.current = true;
        player.pauseVideo();
      }
      return;
    }

    if (phatLaiSauDuck.current) {
      phatLaiSauDuck.current = false;
      player.playVideo();
    }
  }, [ducked, sanSang, playing]);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (playing) {
      player.pauseVideo();
    } else {
      player.setVolume(volume);
      player.playVideo();
    }
  }, [playing, volume]);

  /**
   * Khung chứa trình phát. Đặt ngoài vùng nhìn thấy thay vì `display: none`
   * — trình duyệt có thể chặn phát tiếng từ iframe bị ẩn hẳn.
   */
  const element = (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "1px",
        height: "1px",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div ref={hostRef} />
    </div>
  );

  return { element, playing, toggle, sanSang };
}
