# CoverOverlay Specification (màn "Mở thiệp")

## Overview
- **Target file:** `.../CoverOverlay.tsx`
- **Interaction model:** click-driven — click "Mở thiệp" → overlay biến mất, lộ nội dung thiệp
- **Root:** `fixed inset-0 z-50 flex items-center justify-center overflow-hidden`

## DOM Structure
```
<div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
  ├─ div.absolute.inset-0.pointer-events-none   ← lớp cánh hoa bay
  │    └─ div.absolute × N  (mỗi cái là 1 petal)
  │         └─ svg > path   (hình cánh hoa)
  └─ div.relative  (card cover)
       └─ div w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]
            ├─ div.badge   (huy hiệu tròn 56px, có icon tim)
            └─ div.card    (rounded-lg, bg #FFF7F3)
                 ├─ div.absolute.inset-0  (2 ảnh hoa 2 bên)
                 │    ├─ img flower2-decoration.webp  (trái-trên)
                 │    └─ img flower2-decoration.webp  (phải-dưới)
                 └─ div.content (z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8)
                      ├─ h1  "Hoàng Nam" / "&" / "Thảo Vy"
                      ├─ span "❦"
                      ├─ p "3 tháng 1, 2026"
                      ├─ p "Thân Mời"
                      └─ a  "Mở thiệp"
```

## Cánh hoa bay (ambient petals) — QUAN TRỌNG

Mỗi petal là `<div class="absolute">` với **inline style ngẫu nhiên**:
```
left: <random>%;
top: -30px;  bottom: auto;
color: #c9a97e | #918077 | #b89b78;   ← 3 màu xoay vòng
font-size: <random 14–28>px;           ← quyết định kích thước svg
--sway: <random ~5–20>px;              ← biên độ lắc ngang
animation: ambient-fall <random 18–30>s ease-in-out <random ÂM>s infinite;
```
- **animation-delay ÂM** (vd `-19.96s`) → hoa đã rơi sẵn giữa chừng khi trang load, không đợi
- SVG: `viewBox="0 0 24 24"`, fill = `currentColor`
- path d: `M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75...` (icon dạng lá/cánh hoa)

### Keyframes (verbatim từ site)
```css
@keyframes ambient-fall {
  0%   { transform: translateY(-8vh) translateX(0px) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.5; }
  50%  { transform: translateY(48vh) translateX(var(--sway,20px)) rotate(180deg); opacity: 0.6; }
  92%  { opacity: 0.45; }
  100% { transform: translateY(105vh) translateX(0px) rotate(360deg); opacity: 0; }
}
@keyframes ambient-rise {
  0%   { transform: translateY(6vh) translateX(0px) rotate(0deg); opacity: 0; }
  12%  { opacity: 0.45; }
  55%  { transform: translateY(-42vh) translateX(var(--sway,20px)) rotate(8deg); opacity: 0.55; }
  92%  { opacity: 0.35; }
  100% { transform: translateY(-92vh) translateX(0px) rotate(0deg); opacity: 0; }
}
@keyframes float  { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
@keyframes mbFloat{ 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
```

## Computed Styles

### Card wrapper
- class: `relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]`
- Rendered ở desktop: **600x420px**

### Badge (huy hiệu tim)
- class: `absolute left-1/2 rounded-full flex items-center justify-center`
- size: **56x56px**, background: nâu `rgb(124,106,96)`
- Bên trong: svg 28x28 icon tim, fill trắng/`oklch(0.84955 0 0)`
- Nằm đè lên mép trên card (`-translate-x-1/2`, top âm)

### Card
- class: `relative rounded-lg` → borderRadius **8px**
- Nền: `#FFF7F3` (kem)

### 2 ảnh hoa trang trí
- class: `absolute pointer-events-none h-36 md:h-80 lg:h-80 w-auto max-w-none top-*` (trái)
- và `... bottom-*` (phải) — ảnh thứ 2 thường lật/xoay
- rendered: 260x348px mỗi ảnh
- src: `images/theme/flower2-decoration.webp`

### Content
- class: `relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8`
- padding: `96px 24px 32px`

## Typography (exact)

| Nội dung | size | font | color |
|---|---|---|---|
| `Hoàng Nam` | 36px | **EB Garamond** | `rgb(124,106,96)` |
| `&` | 20px | Baskerville | `rgb(124,106,96)` |
| `Thảo Vy` | 36px | **EB Garamond** | `rgb(124,106,96)` |
| `❦` (hoa văn) | 14px | sans | `rgb(124,106,96)` |
| `3 tháng 1, 2026` | 18px | **Lora** | `rgba(124,106,96,0.72)` |
| `Thân Mời` | 18px | **Lora** | `rgba(124,106,96,0.72)` |
| `Mở thiệp` | 18px | **Lora** | `rgb(255,255,255)` |

- h1 class: `mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl`

### Nút "Mở thiệp" (thẻ `<a>`)
- class: `relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg`
- background: `rgb(124,106,96)`; color: white
- borderRadius: full (pill); padding: `10px 32px`

## States & Behaviors
- **Click "Mở thiệp":** overlay ẩn đi (fade/scale), nội dung thiệp phía dưới hiện ra, nhạc nền bắt đầu phát
- **Petals:** chạy vô hạn, độc lập với tương tác

## Assets
- `images/theme/flower2-decoration.webp` (dùng 2 lần, đối xứng)

## Responsive
- w: 310px (mobile) → 340px (sm) → 520px (md) → 600px (lg)
- Tên: text-3xl (mobile) → text-4xl (sm+)
- Content padding: pt-28 pb-14 (mobile) → pt-24 pb-8 (md)
