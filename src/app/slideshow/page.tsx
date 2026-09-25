import type { Metadata } from "next";
import { SlideShow } from "@/components/slideshow/SlideShow";

export const metadata: Metadata = {
  title: "Trình chiếu — Tiến Anh & Phương Linh",
  description:
    "Slideshow câu chuyện tình yêu, chiếu tại lễ thành hôn ngày 26.09.2026.",
};

/**
 * Trang trình chiếu tại tiệc cưới — mở toàn màn hình trên máy nối màn LED.
 *
 * Tách hẳn khỏi thiệp ở `/`: thiệp dành cho khách xem trên điện thoại,
 * trang này dành cho màn hình lớn ở hội trường.
 */
export default function SlideshowPage() {
  return <SlideShow />;
}
