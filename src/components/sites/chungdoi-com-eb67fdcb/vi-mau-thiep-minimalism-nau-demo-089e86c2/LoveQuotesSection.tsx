import { asset, loveQuotes } from "./data";

/** Lời yêu thương — 2 câu trích dẫn, đặt ngay sau phần cô dâu chú rể */
export function LoveQuotesSection() {
  return (
    <div className="relative z-10 overflow-x-clip px-8 py-10 md:px-12">
      <img
        src={asset.theme("leaf-background.webp")}
        alt=""
        className="pointer-events-none absolute right-[-12%] top-[6%] w-[26%] max-w-none rotate-[168deg] object-contain opacity-[0.12]"
      />

      <div className="relative z-10 mx-auto flex max-w-[460px] flex-col items-center gap-7 text-center">
        <span className="font-serif text-[15px] text-[rgb(145,128,119)]">
          ❦
        </span>

        {loveQuotes.map((quote) => (
          <p
            key={quote}
            className="font-serif text-[16px] font-light italic leading-[1.9] text-[rgb(124,106,96)] md:text-[17px]"
          >
            “{quote}”
          </p>
        ))}
      </div>
    </div>
  );
}
