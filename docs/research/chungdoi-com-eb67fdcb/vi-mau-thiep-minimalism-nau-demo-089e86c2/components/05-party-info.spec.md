# PartyInfoSection Specification

## Overview
- **Target file:** `.../PartyInfoSection.tsx`
- **Interaction model:** mixed — tĩnh + nút "Thêm vào lịch" (link) + nút "XÁC NHẬN THAM DỰ" (mở form RSVP)
- **Root:** `<section class="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">` — 560x948

## DOM Structure
```
<section>
  ├─ span.absolute > img leaf-background.webp       (trang trí)
  ├─ span.absolute > img flower2-decoration.webp    (trang trí)
  └─ div.card  (giống card ở 03: rounded-[13px] + paper.webp mix-blend-multiply)
       ├─ h2 "THÔNG TIN TIỆC CƯỚI"
       ├─ p  "Tiệc cưới sẽ diễn ra vào lúc:"
       ├─ div  giờ/thứ/ngày/tháng/năm
       ├─ p  "(Tức ngày 15 tháng 11 năm Ất Tỵ)"
       ├─ div  2 cột: "Đón khách 17:30" | "Khai tiệc 18:00"
       ├─ div.calendar  Tháng 1/2026
       ├─ a  "Thêm vào lịch"
       └─ button "XÁC NHẬN THAM DỰ"
```

## Typography (exact)
| Nội dung | size | font | weight | color |
|---|---|---|---|---|
| `THÔNG TIN TIỆC CƯỚI` | 20px | Times New Roman | 700 | `rgb(124,106,96)` |
| `Tiệc cưới sẽ diễn ra vào lúc:` | 26px | Baskerville | 400 | `rgb(124,106,96)` |
| `18:00` | 30px | Baskerville | 300 | `rgb(145,128,119)` |
| `THỨ BẢY` | 16px | Times New Roman | 300 | `rgb(124,106,96)` |
| `03` | 40px | Baskerville | 300 | `rgb(124,106,96)` |
| `THÁNG 01` | 16px | Times New Roman | 300 | `rgb(124,106,96)` |
| `2026` | 24px | Times New Roman | 300 | `rgb(124,106,96)` |
| `(Tức ngày 15 tháng 11 năm Ất Tỵ)` | 16px | Baskerville | 300 | `rgb(145,128,119)` |
| `Đón khách` / `Khai tiệc` | 12px | Baskerville | 300 | `rgb(145,128,119)` |
| `17:30` / `18:00` | 20px | Baskerville | 500 | `rgb(124,106,96)` — class `text-lg md:text-xl font-medium mt-1` |

## Lịch tháng (calendar)
| Phần | size | font | weight | color |
|---|---|---|---|---|
| `Tháng 1 / 2026` | 24px | **The Nautigal** | 400 | `rgb(222,217,215)` — class `text-center py-2.5 text-[13px] md:text-[14px]` |
| `T2..CN` (thứ) | 11px | Baskerville | 500 | `rgb(222,217,215)` — `text-center py-1.5 text-[10px] md:text-[11px]` |
| ngày thường | 13px | Baskerville | 300 | `rgb(222,217,215)` — `text-[12px] md:text-[13px]` |
| **ngày 3 (ngày cưới)** | 12px | Baskerville | **700** | `rgb(51,51,51)` — `relative z-10 text-[11px] md:text-[12px] font-bold` |

### Highlight ngày cưới — QUAN TRỌNG
Ngày 3 có **SVG hình TRÁI TIM** nằm absolute phía sau số (không phải vòng tròn):
```html
<div class="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
  <svg viewBox="0 0 24 22" class="absolute inset-0 w-full h-full drop-shadow-sm" fill="#ded9d7">
    <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z"/>
  </svg>
  <span class="relative z-10 text-[11px] md:text-[12px] font-bold">3</span>
</div>
```
- Ô ngày wrapper: `flex items-center justify-center h-[30px] md:h-[34px]`
- Tổng 32 ô ngày (31 ngày + padding)

## Nút
### `a` "Thêm vào lịch"
- class: `mt-3 inline-flex items-center justify-center text-sm underline underline-offset-4`
### `button` "XÁC NHẬN THAM DỰ"
- class: `inline-flex items-center justify-center rounded-full px-6 py-2 text-sm tracking-wide transition-transform hover:scale-[1.03]`
- background: `rgb(124,106,96)`; color: `rgb(222,217,215)`
- borderRadius: full; padding: `8px 24px`; fontSize: 14px; letterSpacing: **0.35px**
- **hover: scale(1.03)** — transition-transform

## Assets
`images/theme/leaf-background.webp`, `flower2-decoration.webp`, `paper.webp`

## Responsive
- md: max-w-560px, giờ 30px, ngày 40px, lịch 13px · mobile: max-w-420px, nhỏ hơn 1 bậc
