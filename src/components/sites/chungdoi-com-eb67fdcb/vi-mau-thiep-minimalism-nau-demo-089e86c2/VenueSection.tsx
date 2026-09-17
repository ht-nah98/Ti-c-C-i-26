import { venue } from "./data";
import { MapPinIcon } from "./icons";

export function VenueSection() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">
      <div className="relative text-center">
        <h2 className="text-[17px] font-serif font-bold text-[rgb(124,106,96)]">
          {venue.heading}
        </h2>
        <p className="mt-2 max-w-[360px] text-[15px] font-serif font-light text-[rgb(145,128,119)]">
          {venue.address}
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center gap-4 md:gap-5">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`}
          loading="lazy"
          title="Bản đồ địa điểm tiệc cưới"
          style={{ border: 0 }}
          className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[460px]"
        />

        {/* Dùng link Google Maps do gia đình cung cấp — chính xác hơn tìm kiếm theo chuỗi địa chỉ */}
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(124,106,96,0.3)] px-5 py-2 font-serif text-[15px] font-semibold text-[rgb(145,128,119)] md:text-[17px]"
        >
          <MapPinIcon className="h-4 w-4" />
          Chỉ đường
        </a>
      </div>
    </section>
  );
}
