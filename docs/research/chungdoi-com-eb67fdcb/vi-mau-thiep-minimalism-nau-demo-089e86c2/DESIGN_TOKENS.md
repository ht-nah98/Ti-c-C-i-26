# Design Tokens — chungdoi.com / minimalism-nau (demo)

Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo
Trích xuất bằng getComputedStyle qua Chrome MCP.

## Màu

| Vai trò | Giá trị | Ghi chú |
|---|---|---|
| Nâu chủ đạo (text + nút) | `rgb(124, 106, 96)` / `#7C6A60` | 307 lần dùng — màu định danh của theme |
| Nâu nhạt (text phụ) | `rgb(145, 128, 119)` / `#918077` | |
| Xám nhạt (divider/muted) | `rgb(222, 217, 215)` / `#DED9D7` | |
| Nền card chính | `rgb(255, 247, 243)` / `#FFF7F3` | nền kem ấm toàn thiệp |
| Nền ngoài card | `rgb(255, 255, 255)` | trắng |
| Nền khối "Thông tin lễ cưới" | `rgb(246, 234, 221)` / `#F6EADD` | be đậm hơn |
| Overlay trắng mờ | `rgba(255, 255, 255, 0.55)` | dùng cho panel nội dung |
| Viền card | `#7c6a6022` (nâu alpha ~13%) | |
| Nâu alpha overlay | `rgba(124, 106, 96, 0.4)` / `0.082` / `0.333` | |

## Font

| Font | Dùng cho |
|---|---|
| `Cormorant Garamond` (serif) | Tên cô dâu chú rể, tiêu đề chính |
| `EB Garamond` (serif) | Nội dung thân, thông tin |
| `The Nautigal` (cursive) | Chữ ký / nhấn mạnh viết tay |
| `Ms Madi` (cursive) | Chữ ký viết tay |
| `Baskerville` (serif) | Một số nhãn |

Tất cả đều có trên Google Fonts → dùng `next/font/google`.

## Layout

- Wrapper ngoài: `flex w-full justify-center bg-white overflow-x-clip`
- Card chính: `relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#7c6a6022] isolate`
- Nền card: `#FFF7F3`
- Section chuẩn: `relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]`
- Tổng chiều cao trang: 6592px (ở md:900px)
- Lớp trang trí: `pointer-events-none absolute inset-0 z-0`

## Assets đã tải (18/18)

### Theme (`images/theme/`)
leaf-background.webp (62KB) · house-background.webp (243KB) · frame-avatar.webp (68KB)
flower2-decoration.webp (114KB) · paper.webp (137KB) · gate.webp (239KB)
cake.webp (101KB) · water.webp (174KB) · paper-note.webp (91KB)

### Ảnh cưới mẫu (`images/photos/`) — từ cdn.chungdoi.com
7 file .jpg (~4.3MB tổng)

### Misc (`images/misc/`)
boho_floral_pink.webp · minimalism_red.webp (icon hộp quà)

## Khác
- Có 1 thẻ `<audio>` — nhạc nền, nút bật/tắt nổi góc phải
- 23 SVG inline
- Trang gốc dùng Next.js + Tailwind (cùng stack với template đích)
