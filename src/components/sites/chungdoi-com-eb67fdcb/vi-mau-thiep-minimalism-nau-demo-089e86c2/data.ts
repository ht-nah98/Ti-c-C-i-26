/**
 * Nội dung thiệp cưới — Hà Tiến Anh & Bùi Phương Linh
 * Ngày cưới: Thứ Bảy 26/09/2026 (16 tháng 08 năm Bính Ngọ)
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
  /** Ảnh mã QR chuyển khoản */
  qr: (name: string) => `${BASE}/images/qr/${name}`,
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
  /** Tên file ảnh QR trong images/qr/, bỏ trống nếu chưa có */
  qr?: string;
}

export const couple = {
  groom: { short: "Tiến Anh", full: "Hà Tiến Anh", rank: "Chú Rể" },
  bride: { short: "Phương Linh", full: "Bùi Phương Linh", rank: "Cô Dâu" },
} as const;

/** Ngày cưới — dùng cho hero, lịch, đếm ngược */
export const weddingDate = {
  time: "11:00",
  weekday: "THỨ BẢY",
  day: "26",
  month: "THÁNG 09",
  year: "2026",
  lunar: "(TỨC NGÀY 16 THÁNG 08 NĂM BÍNH NGỌ)",
  pretty: "26 tháng 9, 2026",
  /** ISO cho đếm ngược: 26/09/2026 11:00 giờ Việt Nam (UTC+7) */
  iso: "2026-09-26T11:00:00+07:00",
  /** Lịch hiển thị tháng 9/2026 */
  calendarMonthLabel: "Tháng 9 / 2026",
  calendarYear: 2026,
  calendarMonth: 9,
  highlightDay: 26,
} as const;

export const parents: Parent[] = [
  {
    label: "Nhà Trai",
    father: "Ông Hà Thanh Nghị",
    mother: "Bà Nguyễn Thị Thanh Vân",
    address: "Việt Trì, Phú Thọ",
  },
  {
    label: "Nhà Gái",
    father: "Ông Bùi Ngọc Uyên",
    mother: "Bà Đoàn Thị Quỳnh Hoa",
    address: "Hai Bà Trưng, Hà Nội",
  },
];

/** Lễ Thành Hôn — nghi lễ duy nhất trên thiệp */
export const ceremonies: Ceremony[] = [
  {
    name: "LỄ THÀNH HÔN",
    time: "11:00",
    host: "Tầng 3 — Trung tâm Tiệc cưới & Hội nghị MIPEC Palace",
    address: "229 Tây Sơn, Phường Kim Liên, Hà Nội",
  },
];

/** Địa điểm chính hiển thị ở phần bản đồ — lễ thành hôn nhà trai */
export const venue = {
  heading: "Lễ Thành Hôn được tổ chức tại",
  /** Dòng hiển thị trong card "Thông tin lễ cưới" (xuống dòng bằng \n) */
  shortLine: "LỄ THÀNH HÔN ĐƯỢC TỔ CHỨC TẠI\nTRUNG TÂM TIỆC CƯỚI & HỘI NGHỊ MIPEC PALACE",
  name: "MIPEC Palace",
  address:
    "Tầng 3 — Trung tâm Tiệc cưới & Hội nghị MIPEC Palace, 229 Tây Sơn, Phường Kim Liên, Hà Nội",
  mapQuery: "MIPEC Palace, 229 Tây Sơn, Kim Liên, Đống Đa, Hà Nội",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("MIPEC Palace, 229 Tây Sơn, Kim Liên, Đống Đa, Hà Nội"),
} as const;

export const timeline: TimelineItem[] = [
  { time: "10:30", title: "Đón khách", place: "Tầng 3, MIPEC Palace" },
  { time: "11:00", title: "Lễ Thành Hôn", icon: "gate.webp" },
  { time: "11:30", title: "Khai tiệc", icon: "cake.webp" },
  { time: "12:00", title: "Cắt bánh & nâng ly", icon: "water.webp" },
  { time: "13:30", title: "Kết thúc tiệc" },
];

/** Tông màu trang phục gợi ý */
export const dressCode = {
  title: "TRANG PHỤC",
  subtitle: "Tông màu gợi ý",
  palette: [
    { name: "Hồng", hex: "#E79BA3" },
    { name: "Tím", hex: "#C4A4D2" },
    { name: "Xanh biển", hex: "#4FA6D6" },
    { name: "Vàng", hex: "#F4C63F" },
    { name: "Be", hex: "#F0B693" },
  ],
} as const;

/** Lời mở đầu phần câu chuyện */
export const storyIntro = [
  "Có lẽ câu chuyện của chúng mình không bắt đầu bằng một khoảnh khắc “yêu từ cái nhìn đầu tiên”, cũng chẳng có một cuộc gặp gỡ tình cờ như trong phim.",
  "Chúng mình bắt đầu từ những điều rất bình thường — một công việc chung, những cuộc trao đổi, những buổi họp… và rồi từ lúc nào chẳng hay, hai người vốn chỉ là đồng nghiệp lại dần trở thành một phần quan trọng trong cuộc sống của nhau.",
] as const;

/** Câu chuyện của chúng mình — 4 cột mốc, bấm để đọc đầy đủ */
export const story: StoryMilestone[] = [
  {
    date: "Tháng 11 / 2024",
    title: "Khi chúng mình bắt đầu biết về nhau",
    teaser:
      "Cùng một công ty, nhưng phải đến dự án AI 101, hai đứa mới thật sự có cơ hội làm quen…",
    full: [
      "Chúng mình đã biết nhau từ năm 2024 vì cùng làm chung một công ty. Nhưng phải đến dự án AI 101 — chương trình chia sẻ và phổ cập kiến thức AI dành cho nhân viên trong công ty — hai đứa mới thật sự có cơ hội làm quen và nói chuyện nhiều hơn.",
      "Khi ấy, mình là speaker của chương trình, còn Phương Linh vừa là học viên, vừa tham gia với vai trò giám khảo của dự án. Và thật tình cờ, đội ngũ của Phương Linh cũng là đội đầu tiên mình trực tiếp đứng lớp.",
      "Từ những buổi trao đổi về nội dung đào tạo, những lần cùng nhau xây dựng kế hoạch, chỉnh sửa sản phẩm và thảo luận làm sao để chương trình học đạt hiệu quả tốt nhất, chúng mình bắt đầu có thêm thật nhiều lý do để trò chuyện.",
      "Ban đầu, mọi thứ đều mang tên “công việc”. Nhưng có lẽ, đâu đó giữa những cuộc họp, những tin nhắn và những lần cùng nhau giải quyết vấn đề, đã có một điều gì đó âm thầm bắt đầu.",
    ],
  },
  {
    date: "01 / 01 / 2025",
    title: "Tin nhắn đầu tiên không còn vì công việc",
    teaser:
      "Chỉ là một lời chúc năm mới, và thêm một câu nhắc cô ấy đi ngủ sớm…",
    full: [
      "Ngày đầu tiên của năm 2025 cũng là ngày xuất hiện một cột mốc rất nhỏ, nhưng sau này khi nhìn lại, mình lại thấy nó thật đặc biệt.",
      "Đó là lần đầu tiên mình nhắn tin cho Phương Linh qua Messenger mà… không cần lấy lý do công việc. Chỉ là một lời chúc năm mới. Và thêm một câu nhắc cô ấy đi ngủ sớm.",
      "Nghe thì chẳng có gì to tát, nhưng với một người trước đó mỗi lần muốn nhắn tin đều phải nghĩ ra một lý do liên quan đến công việc, thì đó đã là một bước tiến rất lớn rồi. Có lẽ hôm ấy nhờ một chút men rượu ngày đầu năm, mình đã mạnh dạn hơn bình thường một chút.",
      "Và cũng từ những tin nhắn tưởng chừng rất đơn giản ấy, khoảng cách giữa hai đứa bắt đầu ngắn lại.",
    ],
  },
  {
    date: "08 / 02 / 2025",
    title: "Ngày chúng mình chính thức thuộc về nhau",
    teaser:
      "Một buổi hẹn kéo dài từ sáng cho tới tối, và điều mình vẫn luôn giữ trong lòng…",
    full: [
      "Sau một khoảng thời gian trò chuyện và tìm hiểu, ngày 08/02/2025, chúng mình có một buổi hẹn kéo dài từ sáng cho tới tối. Một ngày có rất nhiều câu chuyện, rất nhiều khoảnh khắc và chắc chắn là rất nhiều hồi hộp với mình.",
      "Cuối ngày hôm ấy, mình đã nói ra điều mà trước đó vẫn luôn giữ trong lòng. Mình tỏ tình với cô ấy. Và may mắn nhất là… Phương Linh đã đồng ý.",
      "Có những khoảnh khắc chỉ diễn ra trong vài giây nhưng lại đủ để mình nhớ trong rất nhiều năm. Với mình, giây phút cô ấy gật đầu ngày hôm đó chính là một trong những khoảnh khắc hạnh phúc nhất của tuổi trẻ.",
      "Kể từ ngày ấy, “mình” và “cô ấy” chính thức trở thành “chúng mình”.",
    ],
  },
  {
    date: "30 / 04 / 2026",
    title: "Một chuyến đi, một lời hứa và một cái gật đầu nữa",
    teaser:
      "Chuyến đi đầu tiên ra khỏi Việt Nam, và một điều đặc biệt hơn cả chuyến đi…",
    full: [
      "Sau hơn một năm yêu nhau, chúng mình cùng thực hiện một trong những mục tiêu đã từng đặt ra khi bắt đầu đồng hành: cùng nhau đi du lịch nước ngoài. Đó là chuyến đi Trung Quốc kéo dài 5 ngày 4 đêm, và cũng là lần đầu tiên hai đứa cùng nhau bước ra khỏi Việt Nam để khám phá một vùng đất mới.",
      "Chúng mình đã đi cùng nhau qua những con phố xa lạ, ngắm những khung cảnh trước đây chỉ từng thấy qua ảnh, cùng ăn những món chưa từng thử và có thêm rất nhiều kỷ niệm mà chắc chắn sau này sẽ còn nhắc lại rất nhiều lần.",
      "Và tại Tây Hồ, Hàng Châu, ngày 30/04/2026, mình đã chuẩn bị cho một điều đặc biệt hơn cả chuyến đi. Mình cầu hôn cô ấy.",
      "Hơn một năm trước, mình từng hồi hộp chờ một cái gật đầu để được trở thành người yêu của Phương Linh. Lần này, mình lại một lần nữa hồi hộp chờ cô ấy gật đầu — cho một lời hứa dài hơn rất nhiều. Và cô ấy lại nói: Đồng ý.",
    ],
  },
];

/** Lời kết phần câu chuyện */
export const storyOutro = [
  "Từ đồng nghiệp, đến những người bạn có thể nói với nhau mọi chuyện. Từ những tin nhắn lấy lý do công việc, đến lời chúc đầu năm. Từ một buổi hẹn hò, đến những chuyến đi thật xa. Và từ hai cuộc sống riêng biệt, chúng mình quyết định cùng nhau xây dựng một mái nhà.",
  "Có lẽ tình yêu của chúng mình không bắt đầu bằng điều gì quá lớn lao. Nó chỉ bắt đầu từ rất nhiều điều nhỏ bé, diễn ra đúng người, đúng lúc.",
  "Và rồi một ngày, chúng mình nhận ra rằng: Người mình muốn cùng đi qua những hành trình tiếp theo của cuộc đời, vẫn luôn là người đang đứng ngay bên cạnh mình.",
] as const;

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
export const heroPhoto = "DSC01801";

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
  "DSC01550",
  "DSC01379",
  "DSC01416",
  "DSC01438",
  "DSC01454",
  "DSC01609",
  "DSC01628",
  "DSC01711",
  "DSC01735",
  "DSC01738",
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
    name: "",
    timestamp: "",
    message:
      "Hôm nay là ngày vui của anh chị và cũng là ngày em rất hạnh phúc. Chúc anh chị mãi yêu thương nhau như bây giờ và đạt được mọi ước nguyện trong cuộc sống.",
  },
  {
    name: "",
    timestamp: "",
    message:
      "Happy Wedding anh chị! Chúc anh chị của em sẽ có một cuộc sống hôn nhân viên mãn, hạnh phúc. Giờ là lúc anh chị được tận hưởng những điều ngọt ngào và tốt đẹp nhất bởi anh chị xứng đáng!",
  },
  {
    name: "",
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
    qr: "groom-techcombank.jpg",
  },
  {
    role: "Cô Dâu — Bùi Phương Linh",
    bank: "Techcombank",
    number: "19033598273010",
    holder: "BUI PHUONG LINH",
  },
];

export const footerText =
  "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";
