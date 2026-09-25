/**
 * Các kiểu slide dùng cho slideshow chiếu tại tiệc cưới.
 *
 * Mỗi slide tự khai báo thời lượng đứng trên màn (`seconds`), bộ máy
 * trong SlideShow.tsx chỉ việc đọc con số đó để hẹn giờ chuyển cảnh.
 */

/** Slide mở đầu và slide kết — tên hai người, ngày cưới, nơi tổ chức */
export interface TitleSlide {
  kind: "title";
  seconds: number;
  /** Dòng chữ nhỏ phía trên tên, ví dụ "THE WEDDING OF" */
  eyebrow?: string;
  /** Tên hiển thị dạng chữ ký viết tay */
  names: string;
  /** Ngày cưới hoặc dòng nhấn mạnh dưới tên */
  subtitle?: string;
  /** Dòng phụ cuối cùng, ví dụ địa điểm */
  footnote?: string;
  /** Ảnh nền phủ toàn màn, để trống thì dùng nền kem */
  photo?: string;
}

/** Slide trích dẫn — một câu đứng giữa màn, không ảnh */
export interface QuoteSlide {
  kind: "quote";
  seconds: number;
  text: string;
}

/** Bìa mở đầu mỗi chương — ngày tháng lớn + tiêu đề chương */
export interface ChapterSlide {
  kind: "chapter";
  seconds: number;
  /** Ngày tháng viết tay, ví dụ "Tháng 11 / 2024" */
  date: string;
  title: string;
  photo?: string;
}

/** Một đoạn văn câu chuyện — chữ một bên, ảnh một bên */
export interface StorySlide {
  kind: "story";
  seconds: number;
  /** Nhãn chương nhỏ ở góc, giúp khách biết đang ở mốc nào */
  chapter?: string;
  text: string;
  photo: string;
  /** Ảnh nằm bên nào của màn hình */
  side: "left" | "right";
}

/**
 * Slide lời chúc.
 *
 * `cards`: 3 thẻ giấy cạnh nhau, dùng cho lời chúc ngắn.
 * `feature`: một lời chúc dài đứng riêng cả màn, chữ lớn và trang trọng.
 */
export interface WishesSlide {
  kind: "wishes";
  seconds: number;
  heading: string;
  layout: "cards" | "feature";
  /** Vị trí bắt đầu lấy lời chúc, để các slide không trùng nhau */
  offset: number;
  /** Số lời chúc hiện trên một slide (layout `feature` luôn là 1) */
  count: number;
}

/** Slide lời cảm ơn cuối — nhiều dòng chữ nghiêng, không ảnh */
export interface ClosingSlide {
  kind: "closing";
  seconds: number;
  lines: string[];
}

export type Slide =
  | TitleSlide
  | QuoteSlide
  | ChapterSlide
  | StorySlide
  | WishesSlide
  | ClosingSlide;
