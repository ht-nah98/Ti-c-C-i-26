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
  /** Ảnh cưới bản đầy đủ (cạnh dài 1600px) — dùng cho hero và lightbox */
  photo: (name: string) => `${BASE}/images/couple/full/${name}.jpg`,
  /** Ảnh vuông 700px — dùng cho lưới album */
  thumb: (name: string) => `${BASE}/images/couple/thumb/${name}.jpg`,
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
  /** Câu dẫn ngắn, luôn hiển thị */
  teaser: string;
  /** Toàn văn, hiện ra khi khách bấm mở */
  full: string[];
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

/** Câu chuyện của chúng tôi — 4 cột mốc, bấm để đọc đầy đủ */
export const story: StoryMilestone[] = [
  {
    date: "Tháng 11 / 2024",
    title: "Nơi chúng mình bắt đầu biết về nhau",
    teaser:
      "Một lớp học về AI, một người đứng trên bục giảng và một người ngồi dưới vừa học vừa chấm điểm…",
    full: [
      "Chúng mình gặp nhau ở AI 101 — một dự án mà cả hai đều tham gia, nhưng ở hai vai trò rất khác nhau.",
      "Tiến Anh là speaker, người đứng lớp chia sẻ kiến thức. Phương Linh vừa là học viên ngồi dưới nghe, lại vừa là giám khảo chấm điểm phần trình bày.",
      "Thật lòng mà nói, lúc ấy chẳng ai nghĩ xa xôi gì. Chỉ là hai người làm chung một dự án, trao đổi với nhau những câu chuyện về công việc, về bài giảng, về deadline. Nhưng hóa ra, những điều lớn lao trong đời thường bắt đầu từ những nơi bình thường nhất như thế.",
    ],
  },
  {
    date: "01 / 01 / 2025",
    title: "Tin nhắn đầu tiên không vì công việc",
    teaser:
      "Một lời chúc năm mới gửi đi lúc giao thừa — và mọi thứ bắt đầu khác đi từ đó…",
    full: [
      "Ngày đầu tiên của năm mới, giữa hàng trăm lời chúc qua lại, có một tin nhắn Messenger được gửi đi mà không hề liên quan đến công việc.",
      "Đó là lần đầu tiên chúng mình nhắn cho nhau chỉ vì muốn nhắn, không phải vì dự án hay bài giảng nào cả.",
      "Một lời chúc năm mới tưởng như bình thường, nhưng lại là cánh cửa mở ra tất cả những gì đến sau này. Từ hôm đó, những cuộc trò chuyện không còn dừng ở chuyện công việc nữa.",
    ],
  },
  {
    date: "08 / 02 / 2025",
    title: "Ngày chính thức thuộc về nhau",
    teaser:
      "Một buổi hẹn kéo dài từ sáng đến tối, và một câu hỏi cuối cùng cũng được nói ra…",
    full: [
      "Hôm ấy là một buổi hẹn kéo dài từ sáng đến tận tối muộn — kiểu buổi hẹn mà cả hai đều không muốn nó kết thúc.",
      "Đi hết chỗ này đến chỗ khác, nói hết chuyện này sang chuyện khác, và thời gian cứ thế trôi qua lúc nào không hay.",
      "Rồi đến cuối ngày, lời tỏ tình được nói ra. Và câu trả lời là một cái gật đầu.",
      "Từ ngày 08/02/2025, chúng mình chính thức thuộc về nhau.",
    ],
  },
  {
    date: "30 / 04 / 2026",
    title: "Lời cầu hôn bên Tây Hồ",
    teaser:
      "Chuyến đi nước ngoài đầu tiên của chúng mình, và một chiếc nhẫn được lấy ra bên hồ…",
    full: [
      "Tây Hồ, Hàng Châu — Trung Quốc. Chuyến du lịch nước ngoài đầu tiên của chúng mình, cùng nhau.",
      "Giữa khung cảnh mà người ta vẫn bảo là đẹp nhất Giang Nam, bên mặt hồ phẳng lặng, lời cầu hôn được nói ra.",
      "Không có sân khấu, không có đám đông, chỉ có hai người và một câu hỏi đã ấp ủ từ rất lâu.",
      "Và rồi chúng mình biết rằng, chuyến đi đầu tiên ấy sẽ là chuyến đầu tiên trong rất nhiều chuyến đi của cả một đời.",
    ],
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

/** Ảnh bìa — do cô dâu chú rể chọn */
export const heroPhoto = "DSC01550";

/**
 * Toàn bộ ảnh cưới. 6 ảnh đầu do cô dâu chú rể chọn — đây là những
 * ảnh hiện trên lưới album; phần còn lại xem được trong lightbox.
 */
export const albumPhotos = [
  // 6 ảnh đại diện
  "DSC01615",
  "DSC01779",
  "DSC02208",
  "DSC02354",
  "DSC02559",
  "DSC02752",
  // Các ảnh còn lại
  "DSC01379",
  "DSC01416",
  "DSC01438",
  "DSC01454",
  "DSC01609",
  "DSC01628",
  "DSC01711",
  "DSC01735",
  "DSC01738",
  "DSC01801",
  "DSC01839",
  "DSC01861",
  "DSC02011",
  "DSC02012",
  "DSC02023",
  "DSC02034",
  "DSC02065",
  "DSC02187",
  "DSC02246",
  "DSC02266",
  "DSC02320",
  "DSC02417",
  "DSC02435",
  "DSC02524",
  "DSC02570",
  "DSC02612",
  "DSC02661",
];

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
