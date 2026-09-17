"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { asset, albumPhotos } from "./data";
import { CloseIcon } from "./icons";

export function PhotoAlbumSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  const PREVIEW_COUNT = 6;
  const visiblePhotos = albumPhotos.slice(0, PREVIEW_COUNT);
  const remainingCount = albumPhotos.length - PREVIEW_COUNT;

  function showPrev() {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current - 1 + albumPhotos.length) % albumPhotos.length;
    });
  }

  function showNext() {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + 1) % albumPhotos.length;
    });
  }

  return (
    <div className="relative z-10 overflow-x-clip px-6 py-10">
      <img
        src={asset.theme("leaf-background.webp")}
        alt=""
        className="pointer-events-none absolute right-[-10%] top-[10%] w-[30%] max-w-none object-contain opacity-[0.12]"
      />

      <h2 className="mb-6 text-center text-[21px] font-serif font-bold uppercase text-[rgb(124,106,96)]">
        Album Ảnh
      </h2>

      <div className="mx-auto grid max-w-[600px] grid-cols-2 gap-4 md:gap-6">
        {visiblePhotos.map((photo, index) => (
          <div
            key={photo}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-[8px]"
            onClick={() => setOpenIndex(index)}
          >
            <img
              src={asset.thumb(photo)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {index === PREVIEW_COUNT - 1 && remainingCount > 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/45 text-white">
                <span className="font-serif text-[23px] font-light leading-none">
                  +{remainingCount}
                </span>
                <span className="font-serif text-[12px] font-light">
                  Xem tất cả
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {openIndex !== null 
        ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Đóng"
            className="absolute right-4 top-4 text-white"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex(null);
            }}
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-white"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>

          <img
            src={asset.photo(albumPhotos[openIndex])}
            alt=""
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            aria-label="Ảnh tiếp theo"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 font-serif text-[13px] font-light text-white/90">
            {openIndex + 1} / {albumPhotos.length}
          </span>
        </div>,
        document.body,
          )
        : null}
    </div>
  );
}
