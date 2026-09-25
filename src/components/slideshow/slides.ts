/**
 * Kịch bản slideshow chiếu tại tiệc cưới — Hà Tiến Anh & Bùi Phương Linh.
 *
 * Toàn bộ chữ lấy thẳng từ `data.ts` của thiệp, không chép lại. Sửa câu
 * chuyện trong thiệp thì slideshow đổi theo, hai bên không bao giờ lệch.
 *
 * Tổng thời lượng một vòng ~6 phút. Khách đến rải rác trong 30 phút đón
 * khách nên vòng lặp này đủ để ai vào lúc nào cũng xem trọn câu chuyện.
 */
import {
  closingWords,
  couple,
  loveQuotes,
  story,
  storyIntro,
  storyOutro,
  venue,
  weddingDate,
} from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/data";
import type { Slide } from "./types";

/**
 * Ảnh đi kèm từng chương. Mỗi chương 4 đoạn văn nên cần 4 ảnh; chọn sẵn
 * để ảnh không lặp lại ngay cạnh nhau và ảnh đẹp rơi vào đoạn quan trọng.
 */
const CHAPTER_PHOTOS: string[][] = [
  ["DSC01416", "DSC01438", "DSC01454", "DSC01550"],
  ["DSC01609", "DSC01615", "DSC01628", "DSC01711"],
  ["DSC01735", "DSC01779", "DSC01801", "DSC01839"],
  ["DSC02208", "DSC02246", "DSC02354", "DSC02417"],
];

/** Ảnh cho slide bìa mỗi chương */
const CHAPTER_COVER_PHOTOS = ["DSC01379", "DSC01738", "DSC01861", "DSC02320"];

/** Ảnh cho hai đoạn lời mở đầu */
const INTRO_PHOTOS = ["DSC02011", "DSC02012"];

/** Rút gọn tiêu đề chương thành nhãn ngắn hiện ở góc slide chữ */
function chapterLabel(index: number): string {
  return story[index].date;
}

/** Slide mở đầu: tên hai người trên nền ảnh cưới */
const openingSlides: Slide[] = [
  {
    kind: "title",
    seconds: 7,
    eyebrow: "THE WEDDING OF",
    names: `${couple.groom.short} & ${couple.bride.short}`,
    subtitle: weddingDate.pretty,
    photo: "DSC01801",
  },
  {
    kind: "quote",
    seconds: 6,
    text: loveQuotes[1],
  },
];

/** Hai đoạn lời mở đầu câu chuyện */
const introSlides: Slide[] = storyIntro.map((text, i) => ({
  kind: "story" as const,
  seconds: 7,
  text,
  photo: INTRO_PHOTOS[i],
  side: i % 2 === 0 ? ("right" as const) : ("left" as const),
}));

/**
 * Bốn chương câu chuyện. Mỗi chương: 1 slide bìa + 4 slide đoạn văn,
 * ảnh đổi bên liên tục để mắt khách không bị đứng yên một chỗ.
 */
const chapterSlides: Slide[] = story.flatMap((milestone, chapterIndex) => {
  const cover: Slide = {
    kind: "chapter",
    seconds: 4,
    date: milestone.date,
    title: milestone.title,
    photo: CHAPTER_COVER_PHOTOS[chapterIndex],
  };

  const paragraphs: Slide[] = milestone.full.map((text, i) => ({
    kind: "story" as const,
    // Đoạn dài cần nhiều thời gian đọc hơn — 11s cho đoạn trên 220 ký tự
    seconds: text.length > 220 ? 8 : 7,
    chapter: chapterLabel(chapterIndex),
    text,
    photo: CHAPTER_PHOTOS[chapterIndex][i],
    side: i % 2 === 0 ? ("right" as const) : ("left" as const),
  }));

  return [cover, ...paragraphs];
});

/**
 * Lời kết câu chuyện. Đoạn cuối đứng riêng một màn không ảnh — câu
 * "Người mình muốn cùng đi qua những hành trình tiếp theo…" cần khoảng
 * lặng để đọng lại.
 */
const outroSlides: Slide[] = storyOutro.map((text, i) => {
  const isLast = i === storyOutro.length - 1;
  if (isLast) {
    return { kind: "quote" as const, seconds: 7, text };
  }
  return {
    kind: "story" as const,
    seconds: 6,
    text,
    photo: i === 0 ? "DSC02435" : "DSC02524",
    side: i % 2 === 0 ? ("left" as const) : ("right" as const),
  };
});

/**
 * Lời chúc khách gửi — 5 màn, chiếu được tới 14 lời chúc mỗi vòng.
 *
 * 4 màn thẻ (3 lời chúc ngắn mỗi màn) xen 2 màn riêng cho lời chúc dài.
 * Các `offset` lệch nhau nên không màn nào hiện trùng lời chúc của màn khác.
 */
const WISH_HEADING = "Lời chúc từ những người thương";

const wishesSlides: Slide[] = [
  { kind: "wishes", seconds: 7, heading: WISH_HEADING, layout: "cards", offset: 0, count: 3 },
  { kind: "wishes", seconds: 8, heading: WISH_HEADING, layout: "feature", offset: 0, count: 1 },
  { kind: "wishes", seconds: 7, heading: WISH_HEADING, layout: "cards", offset: 3, count: 3 },
  { kind: "wishes", seconds: 8, heading: WISH_HEADING, layout: "feature", offset: 1, count: 1 },
  { kind: "wishes", seconds: 7, heading: WISH_HEADING, layout: "cards", offset: 6, count: 3 },
  { kind: "wishes", seconds: 7, heading: WISH_HEADING, layout: "cards", offset: 9, count: 3 },
];

/** Lời cảm ơn và slide kết */
const closingSlides: Slide[] = [
  {
    kind: "closing",
    seconds: 7,
    lines: [...closingWords],
  },
  {
    kind: "title",
    seconds: 6,
    names: `${couple.groom.short} & ${couple.bride.short}`,
    subtitle: weddingDate.pretty,
    footnote: venue.name,
  },
];

export const slides: Slide[] = [
  ...openingSlides,
  ...introSlides,
  ...chapterSlides,
  ...outroSlides,
  // Lời chúc đi ngay sau câu chuyện — khách vừa nghe xong chuyện tình thì
  // đọc lời chúc của bạn bè, mạch cảm xúc nối liền nhau
  ...wishesSlides,
  ...closingSlides,
];

/** Toàn bộ ảnh slideshow dùng tới, để tải trước trước khi chạy */
export const usedPhotos: string[] = Array.from(
  new Set(
    slides.flatMap((s) => {
      if (s.kind === "story") return [s.photo];
      if ((s.kind === "title" || s.kind === "chapter") && s.photo) return [s.photo];
      return [];
    }),
  ),
);
