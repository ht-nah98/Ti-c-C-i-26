"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { asset, bankAccounts } from "./data";
import { CloseIcon } from "./icons";

interface MiniGift {
  file: string;
  size: number;
  /** Vị trí quanh hộp lớn, tính theo % của khung chứa */
  top: string;
  left: string;
  rotate: number;
  /** Thời lượng và độ trễ của hiệu ứng nhấp nhô */
  duration: number;
  delay: number;
}

/**
 * 8 hộp quà nhỏ bay quanh hộp lớn — dùng lại bộ icon giftbox
 * của theme, mỗi cái nhấp nhô với nhịp riêng (keyframes `float`
 * và `mbFloat` đã có sẵn trong globals.css).
 */
const MINI_GIFTS: MiniGift[] = [
  { file: "boho_floral_pink.webp", size: 40, top: "8%", left: "4%", rotate: -14, duration: 4.2, delay: 0 },
  { file: "minimalism_red.webp", size: 34, top: "4%", left: "80%", rotate: 12, duration: 5.1, delay: 0.6 },
  { file: "royal_v2_purple.webp", size: 30, top: "32%", left: "-4%", rotate: -8, duration: 4.7, delay: 1.2 },
  { file: "crystal_floral_green.webp", size: 36, top: "56%", left: "0%", rotate: 16, duration: 5.4, delay: 0.3 },
  { file: "porcelain_blue.webp", size: 32, top: "52%", left: "84%", rotate: -11, duration: 4.5, delay: 0.9 },
  { file: "jasmine_white.webp", size: 28, top: "26%", left: "88%", rotate: 9, duration: 5.8, delay: 1.5 },
  { file: "double_dragon_blue.webp", size: 26, top: "72%", left: "76%", rotate: -18, duration: 4.9, delay: 0.4 },
  { file: "minimalism_red.webp", size: 24, top: "76%", left: "8%", rotate: 14, duration: 5.6, delay: 1.1 },
];

/** Chấm lấp lánh xen giữa các hộp quà */
const SPARKLES = [
  { size: 14, top: "14%", left: "26%", delay: "0s" },
  { size: 10, top: "8%", left: "64%", delay: "0.5s" },
  { size: 12, top: "64%", left: "26%", delay: "1s" },
  { size: 9, top: "44%", left: "94%", delay: "1.4s" },
];

/** Chia số tài khoản thành nhóm 4 chữ số cho dễ đọc và dễ đối chiếu */
function groupDigits(value: string) {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function BankAccountCard({
  role,
  bank,
  number,
  holder,
  qr,
}: {
  role: string;
  bank: string;
  number: string;
  holder: string;
  qr?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div className="mb-4 rounded-[10px] border border-[rgba(124,106,96,0.2)] bg-white p-4 text-center">
      <p className="font-serif text-[14px] font-semibold text-[rgb(124,106,96)]">
        {role}
      </p>
      <p className="mt-1 font-serif text-[12px] font-light text-[rgb(145,128,119)]">
        {bank}
      </p>
      <p className="mt-2 font-mono text-[16px] tracking-[0.5px] text-[rgb(124,106,96)]">
        {groupDigits(number)}
      </p>
      <p className="mt-1 font-serif text-[12px] font-light uppercase tracking-[0.6px] text-[rgb(145,128,119)]">
        {holder}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 rounded-full border border-[rgba(124,106,96,0.3)] px-4 py-1.5 font-serif text-[12px] text-[rgb(124,106,96)] transition-transform hover:scale-[1.03]"
      >
        {copied ? "Đã sao chép ✓" : "Sao chép số tài khoản"}
      </button>
      {qr ? (
        <div className="mt-3 flex flex-col items-center gap-1.5">
          <img
            src={asset.qr(qr)}
            alt={`Mã QR chuyển khoản ${holder}`}
            className="h-auto w-[168px] rounded-[8px] border border-[rgba(124,106,96,0.15)] bg-white shadow-sm"
          />
          <span className="font-serif text-[11px] font-light text-[rgba(145,128,119,0.8)]">
            Quét mã để chuyển khoản
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function GiftBoxSection() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative z-10 overflow-x-clip px-6 py-10">
      <img
        src={asset.theme("house-background.webp")}
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 w-[120%] max-w-none -translate-x-1/2 object-contain opacity-[0.08]"
      />

      <h2 className="relative mb-4 text-center font-serif text-[21px] font-bold uppercase text-[rgb(124,106,96)]">
        Hộp Quà Mừng
      </h2>

      {!open && (
        <div className="relative mx-auto h-[300px] w-[320px] md:h-[340px] md:w-[380px]">
          {/* Hộp quà nhỏ bay quanh */}
          {MINI_GIFTS.map((gift, i) => (
            <img
              key={`${gift.file}-${i}`}
              src={asset.misc(gift.file)}
              alt=""
              aria-hidden
              className="pointer-events-none absolute object-contain drop-shadow-[2px_3px_3px_rgba(0,0,0,0.15)]"
              style={{
                width: `${gift.size}px`,
                height: `${gift.size}px`,
                top: gift.top,
                left: gift.left,
                transform: `rotate(${gift.rotate}deg)`,
                animation: `float ${gift.duration}s ease-in-out ${gift.delay}s infinite`,
              }}
            />
          ))}

          {/* Chấm lấp lánh */}
          {SPARKLES.map((s, i) => (
            <span
              key={`sparkle-${i}`}
              aria-hidden
              className="pointer-events-none absolute animate-pulse text-[rgb(145,128,119)]"
              style={{
                fontSize: `${s.size}px`,
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
              }}
            >
              ✦
            </span>
          ))}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-transform hover:scale-105"
          >
            <img
              src={asset.misc("minimalism_brown.webp")}
              className="h-28 w-28 object-contain drop-shadow-[4px_5px_6px_rgba(0,0,0,0.18)] md:h-32 md:w-32"
              alt="Hộp quà mừng"
              style={{ animation: "mbFloat 3.6s ease-in-out infinite" }}
            />
            <p className="font-serif text-[13px] text-[rgb(124,106,96)]">
              Nhấn để mở
            </p>
          </button>
        </div>
      )}

      {open 
        ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex max-h-[85vh] w-full max-w-[380px] flex-col overflow-hidden rounded-[16px] bg-[#fff7f3] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thanh tiêu đề cố định */}
            <div className="relative shrink-0 bg-[rgb(124,106,96)] px-6 py-3 text-center">
              <h3 className="font-serif text-[21px] text-white">Hộp Quà Mừng</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 transition-opacity hover:opacity-70"
                aria-label="Đóng"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Vùng nội dung cuộn được */}
            <div className="overflow-y-auto overscroll-contain px-5 pb-5 pt-5">
              {bankAccounts.map((account, i) => (
                <BankAccountCard key={`${account.number}-${i}`} {...account} />
              ))}
              <p className="mt-1 text-center font-serif text-[12px] font-light italic leading-relaxed text-[rgb(145,128,119)]">
                Sự hiện diện của quý khách đã là món quà lớn nhất
                <br />
                với gia đình chúng tôi
              </p>
            </div>
          </div>
        </div>,
        document.body,
          )
        : null}
    </div>
  );
}
