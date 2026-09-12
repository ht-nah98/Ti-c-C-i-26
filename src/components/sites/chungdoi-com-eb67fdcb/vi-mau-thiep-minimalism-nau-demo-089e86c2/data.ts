/**
 * Nội dung thiệp — trích xuất verbatim từ
 * https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo
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

export interface TimelineItem {
  time: string;
  title: string;
  icon?: string;
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
}

export const couple = {
  groom: { short: "Hoàng Nam", full: "Nguyễn Hoàng Nam", rank: "Trưởng Nam" },
  bride: { short: "Thảo Vy", full: "Trần Thảo Vy", rank: "Út Nữ" },
} as const;

export const weddingDate = {
  time: "09:00",
  weekday: "THỨ BẢY",
  day: "03",
  month: "THÁNG 01",
  year: "2026",
  lunar: "(TỨC NGÀY 15 THÁNG 11 NĂM ẤT TỴ)",
  pretty: "3 tháng 1, 2026",
} as const;

export const partyDate = {
  time: "18:00",
  weekday: "THỨ BẢY",
  day: "03",
  month: "THÁNG 01",
  year: "2026",
  lunar: "(Tức ngày 15 tháng 11 năm Ất Tỵ)",
  welcome: "17:30",
  start: "18:00",
} as const;

export const parents: Parent[] = [
  {
    label: "Ông Bà",
    father: "Trần Quốc Hưng",
    mother: "Nguyễn Thị Hồng",
    address: "Quận 1, TP. Hồ Chí Minh",
  },
  {
    label: "Ông Bà",
    father: "Lê Văn Thành",
    mother: "Phạm Thị Lan",
    address: "Quận 3, TP. Hồ Chí Minh",
  },
];

export const venue = {
  heading: "Tiệc cưới sẽ tổ chức tại",
  name: "Trung Tâm Hội Nghị White Palace",
  address:
    "Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
  mapQuery:
    "Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
} as const;

export const timeline: TimelineItem[] = [
  { time: "17:00", title: "Đón khách" },
  { time: "18:00", title: "Khai tiệc", icon: "gate.webp" },
  { time: "18:30", title: "Nghi thức cưới", icon: "cake.webp" },
  { time: "19:00", title: "Cắt bánh & nâng ly", icon: "water.webp" },
  { time: "20:30", title: "Kết thúc tiệc" },
];

export const albumPhotos = [
  "d30fe2fc-7c30-4c1c-8515-83142e714040.jpg",
  "869c2794-6378-4981-a7cb-045489cbc84f.jpg",
  "d797b1a8-d52e-49a7-9f4f-c6688dd86f98.jpg",
  "14435a15-ded0-4efd-881d-f274554b148d.jpg",
  "3a42f7f7-4f7f-4a62-a65c-5da28d132114.jpg",
  "8b354eab-5468-4b35-b061-efd15a560a42.jpg",
];

export const heroPhoto = "88aa2b21-f2e3-4f9a-8725-f59c2ef48c9a.jpg";

export const wishes: Wish[] = [
  {
    name: "Mỹ Linh",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc hai bạn trăm năm hạnh phúc, vạn sự như ý, một đám cưới thật vui!",
  },
  {
    name: "Trọng Nhân",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc mừng hai bạn về chung một nhà! Chúc luôn vui vẻ và yêu thương nhau thật nhiều.",
  },
  {
    name: "Phương Vy",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc Nam và Vy mãi ngọt ngào như ngày đầu, hạnh phúc trọn đời bên nhau!",
  },
  {
    name: "Hải Đăng",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc mừng anh chị! Chúc hai người xây dựng tổ ấm thật hạnh phúc và bền lâu.",
  },
  {
    name: "Ngọc Diệp",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Nhìn thiệp mà thấy ấm áp ghê. Chúc hai bạn một hôn lễ thật trọn vẹn và đáng nhớ!",
  },
  {
    name: "Đức Thịnh",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc cô dâu chú rể trăm năm hạnh phúc, gia đình êm ấm, con cái đủ đầy!",
  },
  {
    name: "Lan Anh",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc mừng hạnh phúc hai bạn nhé! Mong hai bạn luôn nắm tay nhau đi hết cuộc đời.",
  },
  {
    name: "Quốc Bảo",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Mừng đám cưới của cậu mợ! Chúc hai bạn mãi yêu thương và thấu hiểu nhau.",
  },
  {
    name: "Thu Hà",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Ôi tấm thiệp đẹp quá! Chúc hai đứa hạnh phúc viên mãn, sớm có tin vui.",
  },
  {
    name: "Minh Tuấn",
    timestamp: "21:20:27 14/7/2026",
    message:
      "Chúc mừng Hoàng Nam và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé!",
  },
];

export const bankAccounts: BankAccount[] = [
  {
    role: "Chú Rể - TRAN TUAN KIET",
    bank: "Vietcombank",
    number: "1023456789",
    holder: "TRAN TUAN KIET",
  },
  {
    role: "Cô Dâu - LE MINH ANH",
    bank: "Techcombank",
    number: "1987654321",
    holder: "LE MINH ANH",
  },
];

export const footerText =
  "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";
