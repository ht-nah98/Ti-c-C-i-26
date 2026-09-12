"use client";

import { useEffect, useRef, useState } from "react";
import { MusicNoteIcon } from "./icons";
import { useMusicControl } from "./MusicContext";

const TRACK = "/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/audio/ngay-dau-tien.mp3";

interface MusicPlayerProps {
  /** Bật nhạc khi khách mở thiệp */
  autoStart: boolean;
}

/**
 * Nhạc nền "Ngày Đầu Tiên" — Đức Phúc (piano cover).
 * Nút bật/tắt nổi ở góc phải, đĩa nhạc quay khi đang phát.
 *
 * Trình duyệt chặn autoplay có tiếng khi chưa có tương tác, nên nhạc
 * chỉ bắt đầu sau khi khách bấm "Mở thiệp" — đó chính là tương tác hợp lệ.
 */
export function MusicPlayer({ autoStart }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { ducked } = useMusicControl();
  /** Nhạc có đang phát trước khi bị video tắt hay không */
  const resumeAfterDuck = useRef(false);

  // Video phát -> tạm dừng nhạc; video dừng -> bật lại nếu trước đó đang phát
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (ducked) {
      if (!audio.paused) {
        resumeAfterDuck.current = true;
        audio.pause(); // sự kiện onPause cập nhật state
      }
      return;
    }

    if (resumeAfterDuck.current) {
      resumeAfterDuck.current = false;
      audio.volume = 0.45;
      void audio.play().catch(() => undefined);
    }
  }, [ducked]);

  useEffect(() => {
    if (!autoStart) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        // Trình duyệt từ chối — để khách tự bấm nút
        setPlaying(false);
        setBlocked(true);
      });
  }, [autoStart]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.45;
      void audio.play().then(() => {
        setPlaying(true);
        setBlocked(false);
      });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
        title={
          playing
            ? "Ngày Đầu Tiên — Đức Phúc (piano cover)"
            : "Bật nhạc nền"
        }
        className="fixed bottom-5 right-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-[rgb(124,106,96)] text-white shadow-lg transition-transform hover:scale-105 md:bottom-7 md:right-7"
      >
        <MusicNoteIcon
          className="h-[18px] w-[18px]"
          style={
            playing
              ? { animation: "spin 4s linear infinite" }
              : { opacity: 0.55 }
          }
        />
        {/* Vạch chéo khi đang tắt */}
        {!playing ? (
          <span
            aria-hidden
            className="absolute h-[1.5px] w-6 rotate-45 rounded-full bg-white/80"
          />
        ) : null}
        {blocked ? (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#c9a97e] ring-2 ring-[rgb(124,106,96)]"
          />
        ) : null}
      </button>
    </>
  );
}
