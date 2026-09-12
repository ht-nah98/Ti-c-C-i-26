import { asset, couple, heroPhoto } from "./data";

export function HeroSection() {
  return (
    <header className="relative z-10 flex flex-col items-center px-4 pt-12 pb-20 text-center md:pb-32">
      <img
        src={asset.theme("leaf-background.webp")}
        alt=""
        className="pointer-events-none absolute left-[-24%] top-[2%] w-[52%] max-w-none object-contain opacity-[0.12]"
      />
      <img
        src={asset.theme("house-background.webp")}
        alt=""
        className="pointer-events-none absolute left-1/2 top-[30%] w-[130%] max-w-none -translate-x-1/2 object-contain opacity-[0.08] mix-blend-multiply"
      />

      <p
        className="relative z-10 whitespace-pre-line text-[13px] uppercase tracking-[2.56px] md:text-[16px]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 600,
          color: "rgb(130,119,113)",
        }}
      >
        THE WEDDING OF
      </p>

      <div className="relative z-10 mt-3 flex items-center justify-center gap-2 md:mt-4 md:gap-3">
        <span
          className="font-serif italic text-[clamp(30px,8.4vw,37px)] md:text-[46px]"
          style={{ fontWeight: 300, color: "rgb(130,119,113)" }}
        >
          {couple.groom.short}
        </span>
        <span
          className="text-[42px] leading-none md:text-[54px]"
          style={{
            fontFamily: "var(--font-nautigal)",
            color: "rgb(145,128,119)",
          }}
        >
          &amp;
        </span>
        <span
          className="font-serif italic text-[clamp(30px,8.4vw,37px)] md:text-[46px]"
          style={{ fontWeight: 300, color: "rgb(130,119,113)" }}
        >
          {couple.bride.short}
        </span>
      </div>

      <div className="relative z-10 mt-6 aspect-[1094/1554] w-[88%] max-w-[400px] md:mt-8 md:max-w-[520px]">
        <div className="absolute left-[11.5%] top-[8%] z-10 h-[77%] w-[72%] rotate-[-4.78deg] overflow-hidden bg-white">
          <img
            src={asset.photo(heroPhoto)}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <img
          src={asset.theme("frame-avatar.webp")}
          alt=""
          className="absolute inset-0 z-20 h-full w-full object-contain"
        />
      </div>
    </header>
  );
}
