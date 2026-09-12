"use client";

import { useState, type FormEvent } from "react";
import { wishes, type Wish } from "./data";

const SAMPLE_WISHES = [
  "Chúc hai bạn trăm năm hạnh phúc, bạc đầu răng long!",
  "Chúc mừng hai bạn về chung một nhà, mãi mãi yêu thương nhau!",
  "Chúc cô dâu chú rể luôn vui vẻ, hạnh phúc trọn đời bên nhau!",
  "Chúc hai bạn sớm có tin vui, gia đình luôn đầy ắp tiếng cười!",
  "Chúc tình yêu của hai bạn mãi bền vững như ngày đầu!",
];

const VISIBLE_COUNT = 5;

export function GuestbookSection() {
  const [items, setItems] = useState<Wish[]>(wishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  function handleMagic() {
    setMessage(SAMPLE_WISHES[sampleIndex % SAMPLE_WISHES.length]);
    setSampleIndex((prev) => prev + 1);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const newWish: Wish = {
      name: trimmedName,
      timestamp: new Date().toLocaleString("vi-VN"),
      message: trimmedMessage,
    };

    setItems((prev) => [newWish, ...prev]);
    setName("");
    setMessage("");
  }

  const visibleItems = showAll ? items : items.slice(0, VISIBLE_COUNT);

  return (
    <div className="@container relative z-10 overflow-x-clip px-6 py-10">
      <h2 className="mb-6 text-center font-serif text-[20px] font-bold uppercase text-[rgb(124,106,96)]">
        Sổ lưu bút
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-8 flex max-w-[460px] flex-col gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên*"
          className="w-full rounded-lg border border-[rgba(124,106,96,0.3)] bg-white/60 px-4 py-3 text-sm text-[rgb(124,106,96)] focus:outline-none focus:ring-2 focus:ring-[rgba(124,106,96,0.3)]"
        />
        <div className="flex items-start gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập lời chúc*"
            className="h-[60px] w-full resize-none rounded-lg border border-[rgba(124,106,96,0.3)] bg-white/60 px-4 py-3 text-sm text-[rgb(124,106,96)] focus:outline-none focus:ring-2 focus:ring-[rgba(124,106,96,0.3)] md:h-[80px]"
          />
          <button
            type="button"
            onClick={handleMagic}
            className="shrink-0 rounded-lg p-2 text-base leading-none transition-all duration-200 hover:scale-110"
            aria-label="Điền lời chúc mẫu"
          >
            🪄
          </button>
        </div>
        <button
          type="submit"
          className="self-center rounded-full bg-[rgb(124,106,96)] px-6 py-2 font-serif text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          GỬI LỜI CHÚC
        </button>
      </form>

      <div className="mx-auto flex max-w-[460px] flex-col gap-3">
        {visibleItems.map((wish, i) => (
          <div
            key={`${wish.name}-${wish.timestamp}-${i}`}
            className="rounded-[8px] border border-[rgba(124,106,96,0.12)] bg-[rgba(255,255,255,0.55)] p-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-serif text-[14px] font-semibold text-[rgb(124,106,96)]">
                {wish.name}
              </span>
              {wish.timestamp ? (
                <span className="font-serif text-[12px] font-light text-[rgb(145,128,119)]">
                  {wish.timestamp}
                </span>
              ) : null}
            </div>
            <p className="mt-2 font-serif text-[14px] font-light leading-relaxed text-[rgb(124,106,96)]">
              {wish.message}
            </p>
          </div>
        ))}

        {items.length > VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="mx-auto mt-2 font-serif text-sm font-semibold text-[rgb(124,106,96)] underline-offset-2 hover:underline"
          >
            {showAll ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
}
