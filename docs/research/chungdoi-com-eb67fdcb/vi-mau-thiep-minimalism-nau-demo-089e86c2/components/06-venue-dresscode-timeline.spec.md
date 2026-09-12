# VenueSection + DressCode + TimelineSection Specification

Gộp 3 khối liền nhau (idx 6, 7, 8 trong cây DOM).

## A. VenueSection (địa điểm + bản đồ)
- **Target file:** `.../VenueSection.tsx`
- **Root:** `<section class="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">` — 594px cao
- **Interaction:** link "Chỉ đường" → Google Maps

### Structure
```
<section>
  ├─ div.relative.text-center        (h=78)
  │    ├─ h2 "Tiệc cưới sẽ tổ chức tại"
  │    └─ p  địa chỉ
  └─ div.relative.flex.flex-col.items-center.gap-4.md:gap-5.w-full   (h=452)
       ├─ iframe  Google Maps embed
       └─ a "Chỉ đường"
```

### Typography
| Nội dung | size | font | weight | color |
|---|---|---|---|---|
| `Tiệc cưới sẽ tổ chức tại` | 16px | Times New Roman | 700 | `rgb(124,106,96)` |
| `Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh` | 14px | Baskerville | 300 | `rgb(145,128,119)` |
| `Chỉ đường` | 16px | Baskerville | 600 | `rgb(145,128,119)` |

### iframe bản đồ
- class: `mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[...]`
- height: **380px** (md) / 268px (mobile); borderRadius **15px**
- src: `https://www.google.com/maps/embed/v1/place?...` (cần API key — clone dùng embed dạng `?q=` không key, hoặc ảnh tĩnh)

### link "Chỉ đường"
- class: `inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-*`
- Có icon (gap-2) → dùng icon định vị

---

## B. DressCode (idx 7)
- **Target file:** `.../DressCodeSection.tsx`
- **Root:** `relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12` — h=222
- **Interaction:** static

### Typography
| Nội dung | size | font | color |
|---|---|---|---|
| `DRESS CODE` | 20px | Times New Roman, 700, uppercase | `rgb(124,106,96)` |
| `Trang phục dự tiệc` | 16px | Times New Roman | `rgb(145,128,119)` |

Ngoài ra có dải màu gợi ý trang phục (swatches) — kiểm tra lại khi build; dùng palette nâu/kem của theme.

---

## C. TimelineSection — "LỊCH TRÌNH NGÀY CƯỚI" (idx 8)
- **Target file:** `.../TimelineSection.tsx`
- **Root:** `<section class="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">` — 405px
- **Interaction:** static

### Card
- class: `relative overflow-hidden rounded-[10px] px-6 py-9 shadow-[4px_4px_8px_rgba(0,0,0,0.18)]`
- borderRadius **10px** (khác card kia là 13px); padding `36px 24px`

### Grid timeline — zigzag 2 cột
- class: `relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8`
- gridTemplateColumns: **`190px 16px 190px`** (ở md)
- gap: **40px dọc / 32px ngang**
- Cột giữa 16px = đường kẻ dọc/chấm mốc

### 5 mốc (thứ tự, icon)
| # | Giờ | Nội dung | Icon |
|---|---|---|---|
| 0 | 17:00 | Đón khách | — |
| 1 | 18:00 | Khai tiệc | `gate.webp` |
| 2 | 18:30 | Nghi thức cưới | `cake.webp` |
| 3 | 19:00 | Cắt bánh & nâng ly | `water.webp` |
| 4 | 20:30 | Kết thúc tiệc | — |

### Typography
| Nội dung | size | font | weight | color |
|---|---|---|---|---|
| `LỊCH TRÌNH NGÀY CƯỚI` | 20px | Times New Roman | 700 | `rgb(124,106,96)` |
| giờ (`17:00`…) | 17px | Times New Roman | 300 | `rgb(124,106,96)` |
| mô tả (`Đón khách`…) | 15px | Times New Roman | 300 | `rgb(145,128,119)` |

### Assets
`images/theme/gate.webp`, `cake.webp`, `water.webp`, `paper.webp` (texture card)

## Responsive
- md: max-w-560px, grid 190px cột · mobile: max-w-420px, cột co lại
