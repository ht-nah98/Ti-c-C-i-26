import { asset, timeline } from "./data";

const DRESS_CODE_COLORS = ["#7C6A60", "#918077", "#C9A97E", "#F6EADD", "#FFF7F3"];

export function DressCodeSection() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-10 md:px-10 md:py-12">
      <h2 className="text-[20px] font-serif font-bold uppercase text-[rgb(124,106,96)]">
        DRESS CODE
      </h2>
      <p className="text-[16px] font-serif text-[rgb(145,128,119)]">Trang phục dự tiệc</p>
      <div className="flex gap-3">
        {DRESS_CODE_COLORS.map((color) => (
          <span
            key={color}
            className="h-9 w-9 rounded-full border border-white/60 shadow-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <div className="relative overflow-hidden rounded-[10px] bg-[#f6eadd] px-6 py-9 shadow-[4px_4px_8px_rgba(0,0,0,0.18)]">
        <img
          src={asset.theme("paper.webp")}
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-60"
        />

        <div className="relative z-10 flex flex-col gap-4 px-2">
          <h2 className="text-center text-[20px] font-serif font-bold uppercase text-[rgb(124,106,96)]">
            LỊCH TRÌNH NGÀY CƯỚI
          </h2>

          <div
            className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-10 md:gap-x-8"
            style={{ gridTemplateRows: `repeat(${timeline.length}, auto)` }}
          >
            <div
              className="col-start-2 row-span-full mx-auto h-full w-px bg-[rgba(124,106,96,0.3)]"
              style={{ gridRow: `1 / span ${timeline.length}` }}
            />

            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.time}
                  className={
                    isLeft
                      ? "col-start-1 flex flex-col items-end gap-1 text-right"
                      : "col-start-3 flex flex-col items-start gap-1 text-left"
                  }
                  style={{ gridRow: index + 1 }}
                >
                  {item.icon ? (
                    <img
                      src={asset.theme(item.icon)}
                      alt=""
                      className="h-12 w-12 object-contain opacity-80"
                    />
                  ) : null}
                  <span className="text-[17px] font-serif font-light text-[rgb(124,106,96)]">
                    {item.time}
                  </span>
                  <span className="text-[15px] font-serif font-light text-[rgb(145,128,119)]">
                    {item.title}
                  </span>
                </div>
              );
            })}

            {timeline.map((item, index) => (
              <div
                key={`dot-${item.time}`}
                className="col-start-2 flex items-center justify-center"
                style={{ gridRow: index + 1 }}
              >
                <span className="relative z-10 h-2 w-2 rounded-full bg-[rgb(124,106,96)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
