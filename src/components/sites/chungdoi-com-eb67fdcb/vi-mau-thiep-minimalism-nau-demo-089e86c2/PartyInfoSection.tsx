"use client";

import { useState } from "react";
import { asset, partyDate } from "./data";
import { HeartIcon, CalendarIcon } from "./icons";

const WEEKDAY_HEADERS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
// Tháng 1/2026 bắt đầu vào thứ Năm (1/1/2026), có 31 ngày.
const LEADING_BLANKS = 3;
const DAYS_IN_MONTH = 31;
const WEDDING_DAY = 3;

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi&dates=20260103T110000Z/20260103T150000Z";

type Attendance = "yes" | "no" | null;

export function PartyInfoSection() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [attendance, setAttendance] = useState<Attendance>(null);

  function closeRsvp() {
    setIsRsvpOpen(false);
    setAttendance(null);
  }

  function handleSubmit(value: "yes" | "no") {
    setAttendance(value);
  }

  const calendarCells: (number | null)[] = [
    ...Array.from({ length: LEADING_BLANKS }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1),
  ];

  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span className="pointer-events-none absolute block left-[-16%] top-[20%] z-20 w-[28%]">
        <img
          src={asset.theme("leaf-background.webp")}
          alt=""
          className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] rotate-[10.57deg]"
        />
      </span>
      <span className="pointer-events-none absolute block bottom-[-6%] right-[-17%] z-20 w-[32%]">
        <img
          src={asset.theme("flower2-decoration.webp")}
          alt=""
          className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] -scale-x-100"
        />
      </span>

      <div className="relative overflow-hidden rounded-[13px] bg-[#f6eadd] px-5 pb-10 pt-9 text-center shadow-[4px_4px_8px_rgba(0,0,0,0.18)]">
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-60"
        />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <h2 className="text-[20px] font-serif font-bold uppercase tracking-[0.48px] text-[rgb(124,106,96)]">
            THÔNG TIN TIỆC CƯỚI
          </h2>

          <p className="text-[26px] font-serif font-normal text-[rgb(124,106,96)]">
            Tiệc cưới sẽ diễn ra vào lúc:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[30px] font-serif font-light text-[rgb(145,128,119)]">
              {partyDate.time}
            </span>
            <span className="text-[16px] font-serif font-light text-[rgb(124,106,96)]">
              {partyDate.weekday}
            </span>
            <span className="text-[40px] font-serif font-light text-[rgb(124,106,96)]">
              {partyDate.day}
            </span>
            <span className="text-[16px] font-serif font-light text-[rgb(124,106,96)]">
              {partyDate.month}
            </span>
            <span className="text-[24px] font-serif font-light text-[rgb(124,106,96)]">
              {partyDate.year}
            </span>
          </div>

          <p className="text-[16px] font-serif font-light text-[rgb(145,128,119)]">
            {partyDate.lunar}
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[12px] font-serif font-light text-[rgb(145,128,119)]">
                Đón khách
              </p>
              <p className="mt-1 text-lg font-medium text-[rgb(124,106,96)] md:text-xl">
                {partyDate.welcome}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-serif font-light text-[rgb(145,128,119)]">
                Khai tiệc
              </p>
              <p className="mt-1 text-lg font-medium text-[rgb(124,106,96)] md:text-xl">
                {partyDate.start}
              </p>
            </div>
          </div>

          <div className="w-full rounded-[10px] bg-[rgba(255,255,255,0.55)] px-3 py-2">
            <p className="py-2.5 text-center text-[24px] font-[family-name:var(--font-nautigal)] text-[rgb(145,128,119)]">
              Tháng 1 / 2026
            </p>

            <div className="grid grid-cols-7">
              {WEEKDAY_HEADERS.map((label) => (
                <div
                  key={label}
                  className="py-1.5 text-center text-[10px] font-serif font-medium text-[rgb(145,128,119)] md:text-[11px]"
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
                  {day === null ? null : day === WEDDING_DAY ? (
                    <span className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
                      <HeartIcon className="absolute inset-0 h-full w-full text-[#ded9d7] drop-shadow-sm" />
                      <span className="relative z-10 text-[11px] font-bold text-[rgb(51,51,51)] md:text-[12px]">
                        {day}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[12px] font-serif font-light text-[rgb(145,128,119)] md:text-[13px]">
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
            className="mt-3 inline-flex items-center justify-center gap-2 text-sm text-[rgb(145,128,119)] underline underline-offset-4"
          >
            <CalendarIcon className="h-4 w-4" />
            Thêm vào lịch
          </a>

          <button
            type="button"
            onClick={() => setIsRsvpOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-[rgb(124,106,96)] px-6 py-2 font-serif text-sm tracking-[0.35px] text-[rgb(222,217,215)] transition-transform hover:scale-[1.03]"
          >
            XÁC NHẬN THAM DỰ
          </button>
        </div>
      </div>

      {isRsvpOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={closeRsvp}
        >
          <div
            className="relative w-full max-w-[360px] rounded-[13px] bg-[#f6eadd] p-6 text-center shadow-[4px_4px_8px_rgba(0,0,0,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Đóng"
              className="absolute right-4 top-4 text-[rgb(124,106,96)]"
              onClick={closeRsvp}
            >
              ✕
            </button>

            {attendance === null ? (
              <>
                <h3 className="mb-4 text-[18px] font-serif font-bold uppercase text-[rgb(124,106,96)]">
                  Xác nhận tham dự
                </h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Họ tên"
                    className="rounded-full border border-[rgba(124,106,96,0.3)] px-4 py-2 text-sm text-[rgb(124,106,96)] outline-none"
                  />
                  <select
                    value={guestCount}
                    onChange={(event) => setGuestCount(event.target.value)}
                    className="rounded-full border border-[rgba(124,106,96,0.3)] px-4 py-2 text-sm text-[rgb(124,106,96)] outline-none"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="5">5 người</option>
                  </select>
                  <div className="mt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSubmit("yes")}
                      className="inline-flex items-center justify-center rounded-full bg-[rgb(124,106,96)] px-5 py-2 text-sm text-[rgb(222,217,215)] transition-transform hover:scale-[1.03]"
                    >
                      Tham dự
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmit("no")}
                      className="inline-flex items-center justify-center rounded-full border border-[rgba(124,106,96,0.3)] px-5 py-2 text-sm text-[rgb(124,106,96)] transition-transform hover:scale-[1.03]"
                    >
                      Không tham dự
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-4">
                <p className="text-[16px] font-serif text-[rgb(124,106,96)]">
                  {attendance === "yes"
                    ? `Cảm ơn ${name || "bạn"} đã xác nhận tham dự!`
                    : `Cảm ơn ${name || "bạn"} đã phản hồi.`}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
