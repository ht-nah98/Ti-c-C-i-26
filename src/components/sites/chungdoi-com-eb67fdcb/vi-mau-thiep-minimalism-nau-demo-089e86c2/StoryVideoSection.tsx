"use client";

import { useRef, useState } from "react";
import { asset } from "./data";

const VIDEO_SRC =
  "/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/video/cau-chuyen.mp4";

/**
 * Video câu chuyện — chỉ tải khi khách bấm play (preload="none"),
 * tránh ngốn dung lượng của khách dùng 4G.
 */
export function StoryVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play();
  }

  return (
    <div className="relative z-10 overflow-x-clip px-6 py-8">
      <img
        src={asset.theme("leaf-background.webp")}
        alt=""
        className="pointer-events-none absolute left-[-10%] top-[12%] w-[26%] max-w-none rotate-[6deg] object-contain opacity-[0.1]"
      />

      <div className="relative mx-auto max-w-[520px]">
        <div className="relative overflow-hidden rounded-[12px] border border-[rgba(124,106,96,0.18)] bg-black shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={asset.thumb("DSC01615")}
            controls={started}
            playsInline
            preload="none"
            className="block aspect-video w-full bg-black object-cover"
          />

          {!started ? (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Phát video câu chuyện của chúng tôi"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/25"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-6 w-6 fill-[rgb(124,106,96)]"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-serif text-[13px] font-light text-white drop-shadow">
                Xem câu chuyện của chúng mình
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
