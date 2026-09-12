import { footerText } from "./data";

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col items-center gap-1 px-6 py-6 text-center">
      <p className="font-serif text-[13px] text-[rgb(145,128,119)]">{footerText}</p>
      <p className="font-serif text-[12px] text-[rgb(124,106,96)]">♡ Thiệp cưới online</p>
    </footer>
  );
}
