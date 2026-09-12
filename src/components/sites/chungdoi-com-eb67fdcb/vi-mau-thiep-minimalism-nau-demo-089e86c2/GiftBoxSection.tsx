"use client";

import { useEffect, useState } from "react";
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

function BankAccountCard({
  role,
  bank,
  number,
  holder,
}: {
  role: string;
  bank: string;
  number: string;
  holder: string;
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
    <div className="mb-4 rounded-[10px] border border-[rgba(124,106,96,0.2)] p-4">
      <p className="text-[12px] font-semibold text-[rgb(124,106,96)]">{role}</p>
      <p className="text-[10px] text-[rgb(124,106,96)]">{bank}</p>
      <p className="font-mono text-[10px] text-[rgb(124,106,96)]">{number}</p>
      <p className="text-[10px] text-[rgb(124,106,96)]">{holder}</p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-2 rounded-full border border-[rgba(124,106,96,0.3)] px-3 py-1 text-[10px] text-[rgb(124,106,96)] transition-transform hover:scale-[1.03]"
      >
        {copied ? "Đã sao chép" : "Sao chép"}
      </button>
      <div className="mt-3 flex h-28 w-28 items-center justify-center rounded border border-dashed border-[rgba(124,106,96,0.3)] text-[10px] text-[rgb(124,106,96)]">
        QR
      </div>
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

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[380px] rounded-[16px] bg-[#FFF7F3] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="-mx-6 -mt-6 mb-5 rounded-t-[16px] bg-[rgb(124,106,96)] px-6 py-3 text-center">
              <h3 className="font-serif text-[20px] text-white">Hộp Quà Mừng</h3>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white"
              aria-label="Đóng"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {bankAccounts.map((account, i) => (
              <BankAccountCard key={`${account.number}-${i}`} {...account} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
