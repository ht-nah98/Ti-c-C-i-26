# GuestbookSection + GiftBox + Footer Specification

## A. GuestbookSection — "Sổ lưu bút" (idx 9)
- **Target file:** `.../GuestbookSection.tsx`
- **Root:** `@container relative z-10 overflow-x-clip` — h=1138 (khối cao nhất)
- **Interaction:** form nhập (2 field) + 2 button; danh sách 10 lời chúc
- **Lưu ý:** dùng `@container` (container queries) — Tailwind v4 hỗ trợ sẵn

### Structure
```
<div class="@container relative z-10 overflow-x-clip">
  ├─ h2 "Sổ lưu bút"
  ├─ form
  │    ├─ input    placeholder="Nhập tên*"
  │    ├─ textarea placeholder="Nhập lời chúc*"
  │    ├─ button "🪄"            (nút gợi ý lời chúc tự động)
  │    └─ button "GỬI LỜI CHÚC"
  └─ div  danh sách 10 card lời chúc (mỗi card rounded-[8px] p-4)
```

### Form
- **input:** `w-full rounded-lg border px-4 py-3 text-sm focus:outline-none`, placeholder `Nhập tên*`
- **textarea:** `w-full rounded-lg border px-4 py-3 text-sm focus:outline-none`, placeholder `Nhập lời chúc*`
  - chiều cao: `h-[60px] md:h-[...]` (set từ class cha `[&_textarea]:h-[60px]`)
- **button "🪄":** `p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none`
- **button "GỬI LỜI CHÚC":** `rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-*`
  - bg nâu `rgb(124,106,96)`, chữ trắng

### Card lời chúc
- class: `rounded-[8px] p-4`

### Typography
| Phần | size | font | weight | color |
|---|---|---|---|---|
| `Sổ lưu bút` | 20px | Times New Roman | 700 | `rgb(124,106,96)` |
| `GỬI LỜI CHÚC` | 14px | Times New Roman | 600 | — |
| tên người chúc | 14px | Times New Roman | 600 | — |
| timestamp | 12px | Times New Roman | 300 | — |
| nội dung lời chúc | 14px | Times New Roman | 300 | — |

### Dữ liệu 10 lời chúc (verbatim — tất cả timestamp `21:20:27 14/7/2026`)
1. **Mỹ Linh** — Chúc hai bạn trăm năm hạnh phúc, vạn sự như ý, một đám cưới thật vui!
2. **Trọng Nhân** — Chúc mừng hai bạn về chung một nhà! Chúc luôn vui vẻ và yêu thương nhau thật nhiều.
3. **Phương Vy** — Chúc Nam và Vy mãi ngọt ngào như ngày đầu, hạnh phúc trọn đời bên nhau!
4. **Hải Đăng** — Chúc mừng anh chị! Chúc hai người xây dựng tổ ấm thật hạnh phúc và bền lâu.
5. **Ngọc Diệp** — Nhìn thiệp mà thấy ấm áp ghê. Chúc hai bạn một hôn lễ thật trọn vẹn và đáng nhớ!
6. **Đức Thịnh** — Chúc cô dâu chú rể trăm năm hạnh phúc, gia đình êm ấm, con cái đủ đầy!
7. **Lan Anh** — Chúc mừng hạnh phúc hai bạn nhé! Mong hai bạn luôn nắm tay nhau đi hết cuộc đời.
8. **Quốc Bảo** — Mừng đám cưới của cậu mợ! Chúc hai bạn mãi yêu thương và thấu hiểu nhau.
9. **Thu Hà** — Ôi tấm thiệp đẹp quá! Chúc hai đứa hạnh phúc viên mãn, sớm có tin vui.
10. **Minh Tuấn** — Chúc mừng Hoàng Nam và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé!

### Behaviors
- Submit form → thêm lời chúc vào đầu danh sách (client-side state; backend ngoài phạm vi)
- "🪄" → điền sẵn 1 lời chúc mẫu ngẫu nhiên
- hover nút → scale

---

## B. GiftBox — "Hộp Quà Mừng" (idx 10)
- **Target file:** `.../GiftBoxSection.tsx`
- **Root:** `relative z-10 overflow-x-clip` — h=398
- **Interaction:** click-driven — "Nhấn để mở" → lật/mở hộp quà, hiện thông tin ngân hàng + QR

### Structure
```
├─ img house-background.webp   (nền mờ)
├─ h2 "Hộp Quà Mừng"
├─ 4 × span "✦"  (22px, 16px, 14px, 14px — lấp lánh, màu rgb(145,128,119))
├─ p "Nhấn để mở"   (12px, rgb(124,106,96))
└─ (mở ra) panel:
     ├─ h3 "Hộp Quà Mừng"  (20px, Times New Roman, TRẮNG — nền tối)
     ├─ Chú Rể - TRAN TUAN KIET | Vietcombank | 1023456789 | TRAN TUAN KIET
     ├─ Cô Dâu - LE MINH ANH   | Techcombank | ...
     └─ ảnh QR
```

### Typography
| Nội dung | size | font | color |
|---|---|---|---|
| `Hộp Quà Mừng` (ngoài) | 20px | Times New Roman | `rgb(124,106,96)` |
| `Hộp Quà Mừng` (trong panel) | 20px | Times New Roman | `rgb(255,255,255)` |
| `✦` | 22/16/14/14px | sans | `rgb(145,128,119)` |
| `Nhấn để mở` | 12px | sans | `rgb(124,106,96)` |
| `Chú Rể - TRAN TUAN KIET` | 12px | **Gotham** → fallback Montserrat | `rgb(124,106,96)` |
| `Vietcombank` | 10px | sans | `rgb(124,106,96)` |
| `1023456789` | 10px | **monospace** | `rgb(124,106,96)` |

### Assets
- `images/theme/house-background.webp`
- `images/misc/minimalism_brown.webp` (icon hộp quà đúng theme) + 7 icon khác đã tải
- QR: ảnh động từ API → clone dùng QR placeholder tĩnh

**LƯU Ý:** số tài khoản trong demo là dữ liệu mẫu của site, giữ nguyên làm placeholder.

---

## C. Footer (idx 11)
- **Root:** `relative z-10 flex flex-col ...` — h=60
- Text: `Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!` và `♡ chungdoi.com`
- **Khi clone:** thay `♡ chungdoi.com` bằng branding của bạn (đây là chữ ký nhà cung cấp)
