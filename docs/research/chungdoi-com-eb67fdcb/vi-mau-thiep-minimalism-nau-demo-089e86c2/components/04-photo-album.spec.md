# PhotoAlbumSection Specification

## Overview
- **Target file:** `.../PhotoAlbumSection.tsx`
- **Interaction model:** click-driven (ô ảnh `cursor-pointer` → mở lightbox)
- **Root:** `relative z-10 overflow-x-clip` — cao 730px

## DOM Structure
```
<div class="relative z-10 overflow-x-clip">
  ├─ img leaf-background.webp   (trang trí)
  ├─ h2  "Album Ảnh"
  └─ div.grid.grid-cols-2.gap-4.md:gap-6
       ├─ div.cell × 4  (group relative aspect-square cursor-pointer overflow-hidden)
       │    └─ img (object-cover)
       └─ ô cuối có badge "+2"
```

## Computed Styles
### Grid
- class: `grid grid-cols-2 gap-4 md:gap-6`
- gridTemplateColumns: `288px 288px`; gap: **24px** (md) / 16px
### Ô ảnh
- class: `group relative aspect-square cursor-pointer overflow-hidden`
- **aspect-square** — luôn vuông
- img: `object-cover`, có hover effect (class `group` → `group-hover:scale-*`)
### Badge "+2"
- fontSize: 18px; nằm overlay trên ô ảnh thứ 4
- Ý nghĩa: tổng 6 ảnh, hiện 4, còn 2

## Typography
| Nội dung | size | font | color |
|---|---|---|---|
| `Album Ảnh` | 20px | Times New Roman, 700, uppercase | `rgb(124,106,96)` |
| `+2` | 18px | — | trắng trên nền tối mờ |

## Assets (4 ảnh hiển thị)
- `images/photos/d30fe2fc-7c30-4c1c-8515-83142e714040.jpg`
- `images/photos/869c2794-6378-4981-a7cb-045489cbc84f.jpg`
- `images/photos/d797b1a8-d52e-49a7-9f4f-c6688dd86f98.jpg`
- `images/photos/14435a15-ded0-4efd-881d-f274554b148d.jpg`
- 2 ảnh còn lại cho lightbox: `3a42f7f7-...jpg`, `8b354eab-...jpg`
- Trang trí: `images/theme/leaf-background.webp`

## States & Behaviors
- **Hover ô ảnh:** scale nhẹ (group-hover)
- **Click:** mở lightbox xem full — clone ở mức modal hiển thị ảnh lớn

## Responsive
- Desktop: 2 cột 288px, gap 24px · Mobile: 2 cột co lại, gap 16px
