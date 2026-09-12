/**
 * Nội dung thiệp cưới — Hà Tiến Anh & Bùi Phương Linh
 * Ngày cưới: Chủ Nhật 20/09/2026 (10 tháng 08 năm Bính Ngọ)
 *
 * Nguồn: /home/user/Desktop/Thiep-Cuoi/THONG-TIN-LE-CUOI.md
 * Giao diện kế thừa từ mẫu minimalism nâu.
 */

const BASE = "/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2";

export const asset = {
  theme: (name: string) => `${BASE}/images/theme/${name}`,
  photo: (name: string) => `${BASE}/images/photos/${name}`,
  misc: (name: string) => `${BASE}/images/misc/${name}`,
} as const;

export interface Parent {
  label: string;
  father: string;
  mother: string;
  address: string;
}

export interface Ceremony {
  name: string;
  time: string;
  host: string;
  address: string;
  mapUrl?: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  place?: string;
  icon?: string;
}

export interface StoryMilestone {
  date: string;
  title: string;
  description: string;
}

export interface Wish {
  name: string;
  timestamp: string;
  message: string;
}

export interface BankAccount {
  role: string;
  bank: string;
  number: string;
  holder: string;
  hasQr: boolean;
}

export const couple = {
  groom: { short: "Tiến Anh", full: "Hà Tiến Anh", rank: "Chú Rể" },
  bride: { short: "Phương Linh", full: "Bùi Phương Linh", rank: "Cô Dâu" },
} as const;

/** Ngày cưới — dùng cho hero, lịch, đếm ngược */
export const weddingDate = {
  time: "11:00",
  weekday: "CHỦ NHẬT",
  day: "20",
  month: "THÁNG 09",
  year: "2026",
  lunar: "(TỨC NGÀY 10 THÁNG 08 NĂM BÍNH NGỌ)",
  pretty: "20 tháng 9, 2026",
  /** ISO cho đếm ngược: 20/09/2026 11:00 giờ Việt Nam (UTC+7) */
  iso: "2026-09-20T11:00:00+07:00",
  /** Lịch hiển thị tháng 9/2026 */
  calendarMonthLabel: "Tháng 9 / 2026",
  calendarYear: 2026,
  calendarMonth: 9,
  highlightDay: 20,
} as const;

export const parents: Parent[] = [
  {
    label: "Nhà Trai",
    father: "Ông Hà Thanh Nghị",
    mother: "Bà Nguyễn Thị Thanh Vân",
    address: "Thanh Miếu, Việt Trì, Phú Thọ",
  },
  {
    label: "Nhà Gái",
    father: "Ông Bùi Ngọc Uyên",
    mother: "Bà Đoàn Thị Quỳnh Hoa",
    address: "Minh Khai, Hai Bà Trưng, Hà Nội",
  },
];

/** Hai nghi lễ trong ngày */
export const ceremonies: Ceremony[] = [
  {
    name: "LỄ VU QUY",
    time: "07:05",
    host: "Tại nhà gái",
    address:
      "Phòng 1905, Tầng 19, CT2, Chung cư Skylight, Ngõ Hòa Bình 6, Phố Minh Khai, Hà Nội",
  },
  {
    name: "LỄ THÀNH HÔN",
    time: "11:00",
    host: "Tại tư gia nhà trai",
    address:
      "Số nhà 04, ngõ 175 Đường Minh Lang, Mai Sơn, Thanh Miếu, Việt Trì, Phú Thọ",
    mapUrl: "https://maps.app.goo.gl/C3Hui5hKWNtMT5HE6",
  },
];

/** Địa điểm chính hiển thị ở phần bản đồ — lễ thành hôn nhà trai */
export const venue = {
  heading: "Lễ Thành Hôn được cử hành tại",
  name: "Tư gia nhà trai",
  address:
    "Số nhà 04, ngõ 175 Đường Minh Lang, Mai Sơn, Thanh Miếu, Việt Trì, Phú Thọ",
  mapQuery:
    "Số nhà 04, ngõ 175 Đường Minh Lang, Mai Sơn, Thanh Miếu, Việt Trì, Phú Thọ",
  mapUrl: "https://maps.app.goo.gl/C3Hui5hKWNtMT5HE6",
} as const;

export const timeline: TimelineItem[] = [
  { time: "05:00", title: "Nhà trai khởi hành đón dâu", place: "Từ Việt Trì" },
  { time: "07:05", title: "Lễ Vu Quy", place: "Tại nhà gái", icon: "gate.webp" },
  { time: "09:00", title: "Rước dâu về Việt Trì", icon: "water.webp" },
  {
    time: "11:00",
    title: "Lễ Thành Hôn",
    place: "Tại tư gia nhà trai",
    icon: "cake.webp",
  },
];

/** Tông màu trang phục gợi ý */
export const dressCode = {
  title: "TRANG PHỤC",
  subtitle: "Tông màu gợi ý",
  palette: [
    { name: "Đỏ", hex: "#9B2C2C" },
    { name: "Be", hex: "#E8D5BC" },
    { name: "Nâu", hex: "#7C6A60" },
    { name: "Đen", hex: "#2B2B2B" },
    { name: "Trắng", hex: "#FFFFFF" },
  ],
} as const;

/** Câu chuyện của chúng tôi — 4 cột mốc */
export const story: StoryMilestone[] = [
  {
    date: "Tháng 11 / 2024",
    title: "Lần đầu biết về nhau",
    description:
      "Qua dự án AI 101 — Tiến Anh là speaker, Phương Linh vừa là học viên vừa là giám khảo.",
  },
  {
    date: "01 / 01 / 2025",
    title: "Tin nhắn đầu tiên",
    description:
      "Lời chúc năm mới qua Messenger — tin nhắn đầu tiên không vì công việc.",
  },
  {
    date: "08 / 02 / 2025",
    title: "Chính thức thuộc về nhau",
    description:
      "Buổi hẹn kéo dài từ sáng đến tối, một lời tỏ tình và một cái gật đầu.",
  },
  {
    date: "30 / 04 / 2026",
    title: "Lời cầu hôn",
    description:
      "Tại Tây Hồ, Hàng Châu — trong chuyến du lịch nước ngoài đầu tiên của hai đứa.",
  },
];

/** Hai câu trích dẫn mở đầu phần nội dung */
export const loveQuotes = [
  "Có một nơi để về, đó là nhà. Có những người để yêu thương, đó là gia đình. Có được cả hai, đó là hạnh phúc.",
  "Yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng.",
] as const;

/** Lời kết cuối thiệp */
export const closingWords = [
  "Một lời chúc, một cái ôm, hay chỉ là có mặt trong ngày hôm đó — với chúng tôi đều là món quà không gì thay được.",
  "Cảm ơn vì đã ở đây, trong ngày quan trọng nhất của chúng tôi.",
] as const;

export const albumPhotos = [
  "d30fe2fc-7c30-4c1c-8515-83142e714040.jpg",
  "869c2794-6378-4981-a7cb-045489cbc84f.jpg",
  "d797b1a8-d52e-49a7-9f4f-c6688dd86f98.jpg",
  "14435a15-ded0-4efd-881d-f274554b148d.jpg",
  "3a42f7f7-4f7f-4a62-a65c-5da28d132114.jpg",
  "8b354eab-5468-4b35-b061-efd15a560a42.jpg",
];

export const heroPhoto = "88aa2b21-f2e3-4f9a-8725-f59c2ef48c9a.jpg";

/** Ba lời chúc ghim sẵn trên thiệp */
export const wishes: Wish[] = [
  {
    name: "Người em",
    timestamp: "",
    message:
      "Hôm nay là ngày vui của anh chị và cũng là ngày em rất hạnh phúc. Chúc anh chị mãi yêu thương nhau như bây giờ và đạt được mọi ước nguyện trong cuộc sống.",
  },
  {
    name: "Người em",
    timestamp: "",
    message:
      "Happy Wedding anh chị! Chúc anh chị của em sẽ có một cuộc sống hôn nhân viên mãn, hạnh phúc. Giờ là lúc anh chị được tận hưởng những điều ngọt ngào và tốt đẹp nhất bởi anh chị xứng đáng!",
  },
  {
    name: "Người bạn",
    timestamp: "",
    message:
      "Mong rằng tình yêu của hai bạn sẽ luôn tươi mới như hoa, ngọt ngào như mật, bền chặt như dây và sâu đậm tựa biển để cùng nhau đi hết cuộc đời.",
  },
];

export const bankAccounts: BankAccount[] = [
  {
    role: "Chú Rể — Hà Tiến Anh",
    bank: "Techcombank",
    number: "1410989989",
    holder: "HA TIEN ANH",
    hasQr: true,
  },
  {
    role: "Cô Dâu — Bùi Phương Linh",
    bank: "Techcombank",
    number: "19033598273010",
    holder: "BUI PHUONG LINH",
    hasQr: false,
  },
];

export const footerText =
  "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";
