"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { asset, bankAccounts } from "./data";
import { CloseIcon } from "./icons";

interface StarSpec {
  size: number;
  className: string;
  delay: string;
}

const STARS: StarSpec[] = [
  { size: 22, className: "-top-2 -left-2", delay: "0s" },
  { size: 16, className: "-top-1 -right-3", delay: "0.3s" },
  { size: 14, className: "-bottom-2 -left-3", delay: "0.6s" },
  { size: 14, className: "-bottom-1 -right-2", delay: "0.9s" },
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
      <p className="font-serif text-[13px] font-semibold text-[rgb(124,106,96)]">
        {role}
      </p>
      <p className="mt-1 font-serif text-[11px] font-light text-[rgb(145,128,119)]">
        {bank}
      </p>
      <p className="mt-2 font-mono text-[15px] tracking-[0.5px] text-[rgb(124,106,96)]">
        {groupDigits(number)}
      </p>
      <p className="mt-1 font-serif text-[11px] font-light uppercase tracking-[0.6px] text-[rgb(145,128,119)]">
        {holder}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 rounded-full border border-[rgba(124,106,96,0.3)] px-4 py-1.5 font-serif text-[11px] text-[rgb(124,106,96)] transition-transform hover:scale-[1.03]"
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
          <span className="font-serif text-[10px] font-light text-[rgba(145,128,119,0.8)]">
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

      <h2 className="relative mb-4 text-center font-serif text-[20px] font-bold uppercase text-[rgb(124,106,96)]">
        Hộp Quà Mừng
      </h2>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative mx-auto flex w-[200px] flex-col items-center gap-3 transition-transform hover:scale-105"
        >
          {STARS.map((star, i) => (
            <span
              key={i}
              className={`absolute animate-pulse text-[rgb(145,128,119)] ${star.className}`}
              style={{ fontSize: `${star.size}px`, animationDelay: star.delay }}
            >
              ✦
            </span>
          ))}
          <img
            src={asset.misc("minimalism_brown.webp")}
            className="h-28 w-28 object-contain"
            alt="Hộp quà mừng"
          />
          <p className="text-[12px] text-[rgb(124,106,96)]">Nhấn để mở</p>
        </button>
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
              <h3 className="font-serif text-[20px] text-white">Hộp Quà Mừng</h3>
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
              <p className="mt-1 text-center font-serif text-[11px] font-light italic leading-relaxed text-[rgb(145,128,119)]">
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
