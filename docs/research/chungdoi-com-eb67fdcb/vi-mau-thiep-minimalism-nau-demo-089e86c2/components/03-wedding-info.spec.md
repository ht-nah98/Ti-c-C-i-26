# WeddingInfoSection Specification

## Overview
- **Target file:** `src/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/WeddingInfoSection.tsx`
- **Interaction model:** static
- **Element gốc:** `<section>` #0 — 560x965px (ở card 900px)

## DOM Structure
```
<section class="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]">
  ├─ span.absolute > img flower2-decoration.webp   (hoa góc dưới-phải, lật ngang)
  ├─ span.absolute > img leaf-background.webp      (lá trái, xoay 10.57deg)
  └─ div.card  (rounded-[13px] shadow)
      ├─ div.absolute.inset-0            (nền màu)
      ├─ img paper.webp                  (texture, mix-blend-multiply)
      └─ div.content (z-10 flex flex-col items-center gap-6)
          ├─ h2  "THÔNG TIN LỄ CƯỚI"
          ├─ div.grid  (2 bên gia đình, grid-cols-[1fr_auto_1fr])
          ├─ p   "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"
          ├─ div  tên cô dâu chú rể + vai vế
          ├─ p   "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA"
          └─ div  "VÀO LÚC" + giờ/ngày/tháng/năm
```

## Computed Styles (exact)

### section
- class: `relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]`

### Trang trí 1 — hoa
- wrapper span: `pointer-events-none absolute block bottom-[-6%] right-[-17%] z-20 w-[32%]`
- img `flower2-decoration.webp`: `block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] -scale-x-100`
- **Lật ngang** bằng `-scale-x-100`

### Trang trí 2 — lá
- wrapper span: `pointer-events-none absolute block left-[-16%] top-[33%] z-20 w-[28%]`
- img `leaf-background.webp`: `block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)] rotate-[10.57deg]`

### div.card
- class: `relative overflow-hidden rounded-[13px] px-5 pb-10 pt-9 text-center shadow-[4px_4px_8px_rgba(0,0,0,0.18)]`
- borderRadius: **13px**; padding: `36px 20px 40px`
- boxShadow: `4px 4px 8px rgba(0,0,0,0.18)`
- Nền: `rgb(246, 234, 221)` (#F6EADD)

### img paper.webp (texture card)
- class: `pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-*`
- **mix-blend-multiply** — quan trọng để ra chất giấy

### div.content
- class: `relative z-10 flex flex-col items-center gap-6`  → gap: 24px

## Typography (exact — mỗi dòng là 1 phần tử lá)

| Nội dung | size | font | weight | letterSpacing | color |
|---|---|---|---|---|---|
| `THÔNG TIN LỄ CƯỚI` | 20px | Times New Roman | 700 | 0.48px | `rgb(124,106,96)` |
| `Ông Bà` | 12px | Baskerville | 300 | — | `rgb(145,128,119)` |
| `Trần Quốc Hưng` | 12px | Baskerville | 600 | — | `rgb(124,106,96)` |
| `Nguyễn Thị Hồng` | 12px | Baskerville | 600 | — | `rgb(124,106,96)` |
| `Quận 1, TP. Hồ Chí Minh` | 10px | Baskerville | 300 | — | `rgb(145,128,119)` |
| `Lê Văn Thành` | 12px | Baskerville | 600 | — | `rgb(124,106,96)` |
| `Phạm Thị Lan` | 12px | Baskerville | 600 | — | `rgb(124,106,96)` |
| `Quận 3, TP. Hồ Chí Minh` | 10px | Baskerville | 300 | — | `rgb(145,128,119)` |
| `TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI` | 13px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `Nguyễn Hoàng Nam` | **46px** | **EB Garamond** | 400 | — | `rgb(124,106,96)` |
| `Trưởng Nam` | 10px | Cormorant Garamond | 300 | **1.4px** | `rgb(145,128,119)` |
| `&` | **35px** | **Ms Madi** | 300 | — | `rgb(124,106,96)` |
| `Trần Thảo Vy` | **46px** | **EB Garamond** | 400 | — | `rgb(124,106,96)` |
| `Út Nữ` | 10px | Cormorant Garamond | 300 | **1.4px** | `rgb(145,128,119)` |
| `LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA` | 18px (md) / 16px | Baskerville | 400 | — | `rgb(145,128,119)` |
| `VÀO LÚC` | 18px (md) / 16px | Baskerville | 400 | — | `rgb(145,128,119)` |
| `09:00` | 30px (md) / 20px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `THỨ BẢY` | 16px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `\|` (dấu ngăn) | 24px | Baskerville | 300 | — | `rgba(124,106,96,0.4)` |
| `03` | 40px (md) / 30px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `THÁNG 01` | 16px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `2026` | 16px | Baskerville | 300 | — | `rgb(124,106,96)` |
| `(TỨC NGÀY 15 THÁNG 11 NĂM ẤT TỴ)` | nhỏ | Baskerville | 300 | — | `rgb(145,128,119)` |

### Chi tiết tên cô dâu/chú rể
- class: `w-[80%] min-h-[80px] flex items-center justify-center leading-*`

### Grid 2 bên gia đình
- class: `relative grid grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] justify-center gap-x-3.5 gap-y-*`
- Cột giữa (`auto`) là đường kẻ dọc phân cách

## States & Behaviors
N/A — section tĩnh hoàn toàn.

## Assets
- `images/theme/flower2-decoration.webp`
- `images/theme/leaf-background.webp`
- `images/theme/paper.webp`

## Responsive Behavior
- **Desktop (md):** max-w-560px, tên 46px, giờ 30px, ngày 40px, label 18px
- **Mobile:** max-w-420px, giờ 20px, ngày 30px, label 16px
- **Breakpoint:** `md` (768px)
