import { asset, couple, parents, weddingDate, venue } from "./data";

export function WeddingInfoSection() {
  return (
    <section className="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]">
      <span className="pointer-events-none absolute block bottom-[-6%] right-[-17%] z-20 w-[32%]">
        <img
          src={asset.theme("flower2-decoration.webp")}
          alt=""
          className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] -scale-x-100"
        />
      </span>
      <span className="pointer-events-none absolute block left-[-16%] top-[33%] z-20 w-[28%]">
        <img
          src={asset.theme("leaf-background.webp")}
          alt=""
          className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] rotate-[10.57deg]"
        />
      </span>

      <div className="relative overflow-hidden rounded-[13px] bg-[#f6eadd] px-5 pb-10 pt-9 text-center shadow-[4px_4px_8px_rgba(0,0,0,0.18)]">
        <div className="absolute inset-0 rounded-[13px]" />
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-60"
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2
            className="relative z-10 text-center text-[20px] uppercase tracking-[0.48px] text-[rgb(124,106,96)] font-serif font-bold"
          >
            THÔNG TIN LỄ CƯỚI
          </h2>

          <div className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] justify-center gap-x-3.5 gap-y-1">
            {parents.map((parent, index) => {
              const column = index === 0 ? "col-start-1" : "col-start-3";
              return (
                <div key={parent.address} className={`${column} row-start-1`}>
                  <p
                    className="text-[12px] text-[rgb(145,128,119)] font-serif font-light"
                  >
                    {parent.label}
                  </p>
                </div>
              );
            })}
            {parents.map((parent, index) => {
              const column = index === 0 ? "col-start-1" : "col-start-3";
              return (
                <p
                  key={parent.father}
                  className={`${column} row-start-2 text-[12px] text-[rgb(124,106,96)] font-serif font-semibold`}
                >
                  {parent.father}
                </p>
              );
            })}
            {parents.map((parent, index) => {
              const column = index === 0 ? "col-start-1" : "col-start-3";
              return (
                <p
                  key={parent.mother}
                  className={`${column} row-start-3 text-[12px] text-[rgb(124,106,96)] font-serif font-semibold`}
                >
                  {parent.mother}
                </p>
              );
            })}
            {parents.map((parent, index) => {
              const column = index === 0 ? "col-start-1" : "col-start-3";
              return (
                <p
                  key={parent.address}
                  className={`${column} row-start-4 text-[10px] text-[rgb(145,128,119)] font-serif font-light`}
                >
                  {parent.address}
                </p>
              );
            })}
            <div className="col-start-2 row-span-4 w-px bg-[rgba(124,106,96,0.25)]" />
          </div>

          <p
            className="whitespace-pre-line text-[13px] text-[rgb(124,106,96)] font-serif font-light"
          >
            {"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
          </p>

          <div className="flex flex-col items-center gap-1">
            <div
              className="flex min-h-[80px] w-full items-center justify-center whitespace-nowrap text-[clamp(28px,7vw,46px)] leading-none text-[rgb(124,106,96)]"
              style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 400 }}
            >
              {couple.groom.full}
            </div>
            <p
              className="text-[10px] tracking-[1.4px] text-[rgb(145,128,119)]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              {couple.groom.rank}
            </p>
            <span
              className="text-[35px] text-[rgb(124,106,96)]"
              style={{ fontFamily: "var(--font-ms-madi)" }}
            >
              &amp;
            </span>
            <div
              className="flex min-h-[80px] w-full items-center justify-center whitespace-nowrap text-[clamp(28px,7vw,46px)] leading-none text-[rgb(124,106,96)]"
              style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 400 }}
            >
              {couple.bride.full}
            </div>
            <p
              className="text-[10px] tracking-[1.4px] text-[rgb(145,128,119)]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              {couple.bride.rank}
            </p>
          </div>

          <p
            className="whitespace-pre-line text-[16px] font-normal text-[rgb(145,128,119)] md:text-[18px] font-serif font-normal"
          >
            {venue.shortLine}
          </p>

          <p
            className="mb-2 text-[16px] font-normal uppercase text-[rgb(145,128,119)] md:text-[18px] font-serif font-normal"
          >
            VÀO LÚC
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="text-[20px] text-[rgb(124,106,96)] md:text-[30px] font-serif font-light"
            >
              {weddingDate.time}
            </span>
            <span
              className="text-[16px] text-[rgb(124,106,96)] font-serif font-light"
            >
              {weddingDate.weekday}
            </span>
            <span
              className="flex items-center justify-center text-[24px] leading-none text-[rgba(124,106,96,0.4)]"
            >
              |
            </span>
            <span
              className="text-[30px] text-[rgb(124,106,96)] md:text-[40px] font-serif font-light"
            >
              {weddingDate.day}
            </span>
            <span
              className="flex items-center justify-center text-[24px] leading-none text-[rgba(124,106,96,0.4)]"
            >
              |
            </span>
            <span
              className="text-[16px] text-[rgb(124,106,96)] font-serif font-light"
            >
              {weddingDate.month}
            </span>
            <span
              className="text-[16px] text-[rgb(124,106,96)] font-serif font-light"
            >
              {weddingDate.year}
            </span>
          </div>

          <p
            className="text-[12px] text-[rgb(145,128,119)] font-serif font-light"
          >
            {weddingDate.lunar}
          </p>
        </div>
      </div>
    </section>
  );
}
