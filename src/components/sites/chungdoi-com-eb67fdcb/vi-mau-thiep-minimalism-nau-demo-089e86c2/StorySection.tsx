import { asset, story } from "./data";

/**
 * Câu chuyện của chúng tôi — 4 cột mốc dạng timeline dọc.
 * Dùng lại ngôn ngữ thị giác của TimelineSection (đường kẻ dọc + chấm mốc)
 * để thiệp giữ được sự nhất quán.
 */
export function StorySection() {
  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span className="pointer-events-none absolute left-[-15%] top-[8%] z-20 block w-[26%]">
        <img
          src={asset.theme("flower2-decoration.webp")}
          alt=""
          className="block w-full max-w-none rotate-[8deg] object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
        />
      </span>

      <div className="relative overflow-hidden rounded-[10px] bg-[#f6eadd] px-6 py-9 shadow-[4px_4px_8px_rgba(0,0,0,0.18)]">
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-60 mix-blend-multiply"
        />

        <div className="relative z-10 flex flex-col gap-6">
          <h2 className="text-center font-serif text-[20px] font-bold uppercase tracking-[0.48px] text-[rgb(124,106,96)]">
            Câu Chuyện Của Chúng Tôi
          </h2>

          <div className="relative mx-auto w-full max-w-[420px] pl-7">
            {/* Đường kẻ dọc nối các cột mốc */}
            <div
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-[rgba(124,106,96,0.3)]"
            />

            <ol className="flex flex-col gap-7">
              {story.map((milestone) => (
                <li key={milestone.date} className="relative">
                  <span
                    aria-hidden
                    className="absolute left-[-27px] top-[6px] h-[9px] w-[9px] rounded-full bg-[rgb(124,106,96)] ring-4 ring-[#f6eadd]"
                  />
                  <p className="font-[family-name:var(--font-nautigal)] text-[22px] leading-none text-[rgb(145,128,119)]">
                    {milestone.date}
                  </p>
                  <p className="mt-1.5 font-serif text-[15px] font-semibold text-[rgb(124,106,96)]">
                    {milestone.title}
                  </p>
                  <p className="mt-1 font-serif text-[13px] font-light leading-relaxed text-[rgb(145,128,119)]">
                    {milestone.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
