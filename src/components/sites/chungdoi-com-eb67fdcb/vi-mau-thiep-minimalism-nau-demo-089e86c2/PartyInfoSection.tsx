"use client";

import { useEffect, useState } from "react";
import { asset, ceremonies, weddingDate } from "./data";
import { HeartIcon, CalendarIcon, MapPinIcon } from "./icons";

const WEEKDAY_HEADERS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/**
 * Lịch tháng 9/2026: ngày 1/9/2026 là thứ Ba → 1 ô trống đầu (tuần bắt đầu T2).
 * Tháng 9 có 30 ngày. Ngày cưới: 26/09 (Thứ Bảy).
 */
const LEADING_BLANKS = 1;
const DAYS_IN_MONTH = 30;

/** 26/09/2026 11:00–13:30 giờ VN (UTC+7) => 04:00–06:30 UTC */
const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("Lễ Thành Hôn — Bùi Phương Linh & Hà Tiến Anh") +
  "&dates=20260926T040000Z/20260926T063000Z" +
  "&details=" +
  encodeURIComponent("Đón khách từ 10:30 · Lễ Thành Hôn 11:00") +
  "&location=" +
  encodeURIComponent(
    "MIPEC Palace, 229 Tây Sơn, Kim Liên, Đống Đa, Hà Nội",
  );

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diffFromNow(target: number): Remaining | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** Đếm ngược tới giờ Lễ Thành Hôn. Chỉ chạy sau khi mount để tránh lệch SSR. */
function Countdown() {
  /**
   * `null` ở lần render đầu (cả trên server lẫn client) để HTML khớp nhau;
   * interval trong effect mới bắt đầu cập nhật, nên không setState đồng bộ.
   */
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const target = new Date(weddingDate.iso).getTime();
    const tick = () => {
      setRemaining(diffFromNow(target));
      setStarted(true);
    };
    const id = setInterval(tick, 1000);
    const raf = requestAnimationFrame(tick);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!started) {
    return <div className="h-[74px]" aria-hidden />;
  }

  if (!remaining) {
    return (
      <p className="font-serif text-[17px] font-light text-[rgb(124,106,96)]">
        Hôm nay là ngày chúng tôi về chung một nhà
      </p>
    );
  }

  const units: [number, string][] = [
    [remaining.days, "Ngày"],
    [remaining.hours, "Giờ"],
    [remaining.minutes, "Phút"],
    [remaining.seconds, "Giây"],
  ];

  return (
    <div className="flex items-start justify-center gap-4 md:gap-6">
      {units.map(([value, label]) => (
        <div key={label} className="flex w-[52px] flex-col items-center">
          <span className="font-serif text-[27px] font-light leading-none text-[rgb(124,106,96)] md:text-[31px]">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1.5 font-serif text-[11px] font-light uppercase tracking-[1.2px] text-[rgb(145,128,119)]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PartyInfoSection() {
  const calendarCells: (number | null)[] = [
    ...Array.from({ length: LEADING_BLANKS }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1),
  ];

  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span className="pointer-events-none absolute left-[-16%] top-[20%] z-20 block w-[28%]">
        <img
          src={asset.theme("leaf-background.webp")}
          alt=""
          className="block w-full max-w-none rotate-[10.57deg] object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
        />
      </span>
      {/* Đặt dưới đáy card để không che vùng lịch bên phải */}
      <span className="pointer-events-none absolute bottom-[-10%] right-[-15%] z-0 block w-[30%]">
        <img
          src={asset.theme("flower2-decoration.webp")}
          alt=""
          className="block w-full max-w-none -scale-x-100 object-contain opacity-90 drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
        />
      </span>

      <div className="relative overflow-hidden rounded-[13px] bg-[#f6eadd] px-5 pb-10 pt-9 text-center shadow-[4px_4px_8px_rgba(0,0,0,0.18)]">
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-60 mix-blend-multiply"
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-serif text-[21px] font-bold uppercase tracking-[0.48px] text-[rgb(124,106,96)]">
            Lễ Thành Hôn
          </h2>

          {/* Đếm ngược tới ngày cưới */}
          <div className="w-full rounded-[10px] bg-[rgba(255,255,255,0.55)] px-3 py-4">
            <p className="mb-3 font-serif text-[13px] font-light uppercase tracking-[1.4px] text-[rgb(145,128,119)]">
              Còn lại
            </p>
            <Countdown />
          </div>

          {/* Nghi lễ */}
          <div className="flex w-full flex-col gap-4">
            {ceremonies.map((ceremony) => (
              <div
                key={ceremony.name}
                className="rounded-[10px] border border-[rgba(124,106,96,0.18)] bg-[rgba(255,255,255,0.5)] px-4 py-5"
              >
                <p className="font-serif text-[16px] font-bold uppercase tracking-[0.8px] text-[rgb(124,106,96)]">
                  {ceremony.name}
                </p>
                <p className="mt-2 font-serif text-[31px] font-light leading-none text-[rgb(124,106,96)]">
                  {ceremony.time}
                </p>
                <p className="mt-2 font-serif text-[14px] font-light text-[rgb(145,128,119)]">
                  {ceremony.host}
                </p>
                <p className="mx-auto mt-1 max-w-[300px] font-serif text-[13px] font-light leading-relaxed text-[rgb(145,128,119)]">
                  {ceremony.address}
                </p>
                {ceremony.mapUrl ? (
                  <a
                    href={ceremony.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-serif text-[13px] text-[rgb(124,106,96)] underline underline-offset-4"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    Xem bản đồ
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          {/* Ngày cưới */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-serif text-[17px] font-light text-[rgb(124,106,96)]">
              {weddingDate.weekday}
            </span>
            <span className="font-serif text-[25px] font-light leading-none text-[rgba(124,106,96,0.4)]">
              |
            </span>
            <span className="font-serif text-[31px] font-light text-[rgb(124,106,96)] md:text-[41px]">
              {weddingDate.day}
            </span>
            <span className="font-serif text-[25px] font-light leading-none text-[rgba(124,106,96,0.4)]">
              |
            </span>
            <span className="font-serif text-[17px] font-light text-[rgb(124,106,96)]">
              {weddingDate.month}
            </span>
            <span className="font-serif text-[25px] font-light text-[rgb(124,106,96)]">
              {weddingDate.year}
            </span>
          </div>
          <p className="-mt-3 font-serif text-[13px] font-light text-[rgb(145,128,119)]">
            {weddingDate.lunar}
          </p>

          {/* Lịch tháng 9/2026 */}
          <div className="w-full rounded-[10px] bg-[rgba(255,255,255,0.55)] px-3 py-2">
            <p className="py-2.5 text-center font-[family-name:var(--font-nautigal)] text-[25px] text-[rgb(145,128,119)]">
              {weddingDate.calendarMonthLabel}
            </p>

            <div className="grid grid-cols-7">
              {WEEKDAY_HEADERS.map((label) => (
                <div
                  key={label}
                  className="py-1.5 text-center font-serif text-[11px] font-medium text-[rgb(145,128,119)] md:text-[12px]"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarCells.map((day, index) => (
                <div
                  key={index}
                  className="flex h-[30px] items-center justify-center md:h-[34px]"
                >
                  {day === null ? null : day === weddingDate.highlightDay ? (
                    <span className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
                      <HeartIcon className="absolute inset-0 h-full w-full text-[#ded9d7] drop-shadow-sm" />
                      <span className="relative z-10 text-[12px] font-bold text-[rgb(51,51,51)] md:text-[13px]">
                        {day}
                      </span>
                    </span>
                  ) : (
                    <span className="font-serif text-[13px] font-light text-[rgb(145,128,119)] md:text-[14px]">
                      {day}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-2 text-[15px] text-[rgb(145,128,119)] underline underline-offset-4"
          >
            <CalendarIcon className="h-4 w-4" />
            Thêm vào lịch
          </a>
        </div>
      </div>
    </section>
  );
}
