"use client";

import { useState } from "react";
import { asset, story, storyIntro, storyOutro } from "./data";

/**
 * Câu chuyện của chúng mình — lời mở đầu, timeline dọc 4 cột mốc, lời kết.
 * Mỗi mốc hiện câu dẫn kèm dấu "…"; bấm vào để mở toàn văn.
 */
export function StorySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span className="pointer-events-none absolute left-[-15%] top-[8%] z-0 block w-[26%]">
        <img
          src={asset.theme("flower2-decoration.webp")}
          alt=""
          className="block w-full max-w-none rotate-[8deg] object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
        />
      </span>

      <div className="relative overflow-hidden rounded-[10px] bg-[#f6eadd] px-5 py-9 shadow-[4px_4px_8px_rgba(0,0,0,0.18)] md:px-7">
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-60 mix-blend-multiply"
        />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-serif text-[21px] font-bold uppercase tracking-[0.48px] text-[rgb(124,106,96)]">
              Câu Chuyện Của Chúng Mình
            </h2>
            <p className="mt-2 font-serif text-[13px] font-light italic text-[rgb(145,128,119)]">
              Bấm vào từng mốc thời gian để đọc tiếp
            </p>
          </div>

          {/* Lời mở đầu */}
          <div>
            {storyIntro.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-3 font-serif text-[14.5px] font-light leading-[1.85] text-[rgb(124,106,96)] last:mb-0 md:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative w-full pl-7">
            {/* Đường kẻ dọc nối các cột mốc */}
            <div
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-[rgba(124,106,96,0.3)]"
            />

            <ol className="flex flex-col gap-5">
              {story.map((milestone, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={milestone.date} className="relative">
                    <span
                      aria-hidden
                      className={`absolute left-[-27px] top-[7px] h-[9px] w-[9px] rounded-full ring-4 ring-[#f6eadd] transition-colors ${
                        isOpen
                          ? "bg-[rgb(124,106,96)]"
                          : "bg-[rgba(124,106,96,0.45)]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full rounded-[8px] border border-transparent px-3 py-2.5 text-left transition-colors hover:border-[rgba(124,106,96,0.18)] hover:bg-[rgba(255,255,255,0.4)]"
                    >
                      <p className="font-[family-name:var(--font-nautigal)] text-[23px] leading-none text-[rgb(145,128,119)]">
                        {milestone.date}
                      </p>
                      <p className="mt-1.5 font-serif text-[16px] font-semibold leading-snug text-[rgb(124,106,96)]">
                        {milestone.title}
                      </p>

                      {!isOpen ? (
                        <p className="mt-1.5 font-serif text-[14px] font-light leading-relaxed text-[rgb(145,128,119)]">
                          {milestone.teaser}
                        </p>
                      ) : null}

                      <span className="mt-2 inline-block font-serif text-[12px] font-light italic text-[rgba(124,106,96,0.75)] underline underline-offset-4">
                        {isOpen ? "Thu gọn" : "Đọc tiếp"}
                      </span>
                    </button>

                    {/* Toàn văn */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-3 mb-1 mt-2 rounded-[8px] border border-[rgba(124,106,96,0.15)] bg-[rgba(255,255,255,0.55)] px-4 py-4">
                          {milestone.full.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="mb-3 font-serif text-[14.5px] font-light leading-[1.85] text-[rgb(124,106,96)] last:mb-0 md:text-[15px]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Lời kết */}
          <div className="border-t border-[rgba(124,106,96,0.2)] pt-6">
            {storyOutro.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-3 font-serif text-[14.5px] font-light leading-[1.85] text-[rgb(124,106,96)] last:mb-0 md:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
