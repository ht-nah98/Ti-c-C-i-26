import { asset, closingWords, couple } from "./data";

/** Lời kết — cảm ơn, đặt trước footer */
export function ClosingSection() {
  return (
    <div className="relative z-10 overflow-x-clip px-8 pb-6 pt-12 md:px-12">
      <img
        src={asset.theme("house-background.webp")}
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 w-[120%] max-w-none -translate-x-1/2 object-contain opacity-[0.07] mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto flex max-w-[460px] flex-col items-center gap-5 text-center">
        {closingWords.map((line) => (
          <p
            key={line}
            className="font-serif text-[15px] font-light italic leading-[1.9] text-[rgb(124,106,96)] md:text-[16px]"
          >
            {line}
          </p>
        ))}

        <span className="font-serif text-[15px] text-[rgb(145,128,119)]">
          ❦
        </span>

        <p className="font-[family-name:var(--font-nautigal)] text-[35px] leading-none text-[rgb(124,106,96)] md:text-[41px]">
          {couple.groom.short} &amp; {couple.bride.short}
        </p>
      </div>
    </div>
  );
}
