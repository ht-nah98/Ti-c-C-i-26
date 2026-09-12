# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/HeroSection.tsx`
- **Interaction model:** static (chỉ có lớp trang trí absolute, không interactive)
- **Element gốc:** `<header>` — chiều cao 1056px ở container 898px

## DOM Structure
```
<header class="relative z-10 flex flex-col items-center px-4 pt-12 pb-20 text-center md:pb-32">
  ├─ img  leaf-background.webp    (trang trí, absolute trái)
  ├─ img  house-background.webp   (trang trí, absolute giữa-dưới)
  ├─ p    "The Wedding Of"
  ├─ div  (hàng tên: Hoàng Nam & Thảo Vy)
  │   ├─ span "Hoàng Nam"
  │   ├─ span "&"
  │   └─ span "Thảo Vy"
  └─ div  (khối ảnh polaroid)
      ├─ div > img  ảnh cưới (xoay -4.78deg)
      └─ img  frame-avatar.webp (khung phủ lên trên)
```

## Computed Styles (exact)

### header (container)
- display: flex; flexDirection: column; alignItems: center
- padding: `48px 16px 128px` (pt-12 px-4 pb-20, md:pb-32)
- position: relative; zIndex: 10
- color: `rgb(124, 106, 96)`
- textAlign: center

### img leaf-background.webp (lớp trang trí 1)
- class: `pointer-events-none absolute left-[-24%] top-[2%] w-[52%] max-w-none object-contain opacity-[0.12]`
- natural: 441x1254 · rendered: 467x1328
- opacity: **0.12**

### img house-background.webp (lớp trang trí 2)
- class: `pointer-events-none absolute left-1/2 top-[30%] w-[130%] max-w-none -translate-x-1/2 object-contain opacity-[0.08] mix-blend-*`
- natural/rendered: 1167x1151
- opacity: **0.08**, có `mix-blend` mode

### p "The Wedding Of"
- class: `relative z-10 whitespace-pre-line text-[13px] uppercase md:text-[16px]`
- fontFamily: **Cormorant Garamond**; fontSize: 16px (md) / 13px (mobile)
- fontWeight: 600; letterSpacing: **2.56px**; textTransform: uppercase
- color: `rgb(130, 119, 113)`
- Text hiển thị: `THE WEDDING OF`

### div hàng tên
- class: `relative z-10 mt-3 flex items-center justify-center gap-2 md:mt-4 md:gap-3`
- kích thước: 434x69

### span "Hoàng Nam" / "Thảo Vy"
- class: `italic text-[clamp(30px,8.4vw,37px)] md:text-[46px]`
- fontFamily: **Times New Roman, serif** (không phải Cormorant); fontStyle: italic
- fontSize: 46px (md) · clamp(30px, 8.4vw, 37px) (mobile)
- fontWeight: 300; color: `rgb(130, 119, 113)`

### span "&"
- class: `text-[42px] leading-none md:text-[54px]`
- fontFamily: **The Nautigal** (cursive); fontSize: 54px (md) / 42px (mobile)
- color: `rgb(145, 128, 119)`; lineHeight: none

### div khối ảnh polaroid (wrapper)
- class: `relative z-10 mt-6 aspect-[1094/1554] w-[88%] max-w-[400px] md:mt-8 md:max-w-[520px]`
- rendered: 520x739 (ở md)
- **aspect-ratio: 1094/1554** — giữ đúng tỉ lệ khung

### div chứa ảnh (lớp dưới khung)
- class: `absolute left-[11.5%] top-[8%] z-10 h-[77%] w-[72%] rotate-[-4.78deg] overflow-hidden bg-white`
- **transform: rotate(-4.78deg)** — ảnh nghiêng
- backgroundColor: white; overflow: hidden
- rendered: 420x598

### img ảnh cưới
- src: `images/photos/88aa2b21-f2e3-4f9a-8725-f59c2ef48c9a.jpg`
- class: `h-full w-full object-cover`

### img frame-avatar.webp (khung phủ lên)
- Nằm TRÊN ảnh cưới (layer cao hơn) — gồm khung polaroid + băng dính washi phía trên + hoa khô + dấu sáp hình tim
- object-contain, phủ toàn wrapper

## States & Behaviors
- **Hover:** N/A
- **Scroll:** N/A (nội dung tĩnh; hiệu ứng vào-màn-hình cần kiểm tra thêm ở BEHAVIORS.md)

## Assets
- `images/theme/leaf-background.webp`
- `images/theme/house-background.webp`
- `images/theme/frame-avatar.webp`
- `images/photos/88aa2b21-f2e3-4f9a-8725-f59c2ef48c9a.jpg`

## Text Content (verbatim)
- `THE WEDDING OF`
- `Hoàng Nam`
- `&`
- `Thảo Vy`

## Responsive Behavior
- **Desktop (md, card 900px):** tên 46px, "&" 54px, ảnh max-w-520px, pb-32
- **Mobile (card 480px):** tên clamp(30px,8.4vw,37px), "&" 42px, ảnh max-w-400px, pb-20
- **Breakpoint:** `md` (768px)

## LƯU Ý QUAN TRỌNG — layering
Khối polaroid là **2 lớp chồng nhau**, KHÔNG phải 1 ảnh:
1. Ảnh cưới (dưới, xoay -4.78deg, clip trong div bg-white)
2. `frame-avatar.webp` (trên, chứa khung + hoa + sáp)
Bỏ sót lớp 2 sẽ mất toàn bộ hoa khô và dấu sáp.
