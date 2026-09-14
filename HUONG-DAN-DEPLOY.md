# Hướng dẫn deploy 2 thiệp chung 1 database

Thiệp cưới Hà Tiến Anh & Bùi Phương Linh — 20/09/2026.

Mục tiêu: **2 đường link** (một gửi nhà trai, một gửi nhà gái), nội dung
giống hệt nhau, nhưng lời chúc khách gửi đều đổ về **cùng một database**
và cả hai bên đều đọc được của nhau.

---

## 1. Tạo database (làm một lần)

1. Vào <https://vercel.com> → **Storage** → **Create Database** → chọn
   **Neon (Postgres)**.
2. Đặt tên bất kỳ, region chọn **Singapore (sin1)** cho gần Việt Nam.
3. Tạo xong, Vercel tự sinh biến `DATABASE_URL` / `POSTGRES_URL`.

Bảng `loi_chuc` **tự tạo** khi có lời chúc đầu tiên — không cần chạy SQL tay.

---

## 2. Deploy thiệp thứ nhất (nhà trai)

```bash
cd /home/user/Desktop/website-clone
npx vercel            # lần đầu sẽ hỏi đăng nhập
npx vercel --prod
```

Trong Vercel → **Settings → Environment Variables**, thêm:

| Biến | Giá trị | Ghi chú |
|---|---|---|
| `DATABASE_URL` | (Vercel tự điền khi gắn Storage) | Bắt buộc |
| `NEXT_PUBLIC_PHIA` | `trai` | Đánh dấu khách đến từ thiệp nhà trai |
| `ACCESS_KEY` | một chuỗi bí mật tự nghĩ | Tuỳ chọn, chống spam |

→ Được link ví dụ: `https://thiep-nha-trai.vercel.app`

---

## 3. Deploy thiệp thứ hai (nhà gái)

Vẫn **cùng một mã nguồn**, chỉ tạo thêm một project Vercel nữa:

1. Vercel → **Add New → Project** → chọn lại đúng repo này.
2. Đặt tên project khác, ví dụ `thiep-nha-gai`.
3. **Quan trọng:** vào **Storage** → gắn **cùng database** đã tạo ở bước 1
   (không tạo database mới).
4. Environment Variables:

| Biến | Giá trị |
|---|---|
| `DATABASE_URL` | cùng database với thiệp nhà trai |
| `NEXT_PUBLIC_PHIA` | `gai` |
| `ACCESS_KEY` | giống hệt thiệp nhà trai |

→ Được link: `https://thiep-nha-gai.vercel.app`

**Kết quả:** hai link khác nhau, nội dung giống hệt, lời chúc dùng chung.

---

## 4. Xem danh sách khách đã gửi lời chúc

Vercel → **Storage** → chọn database → tab **Data** → chạy:

```sql
SELECT name          AS "Tên khách",
       CASE phia WHEN 'trai' THEN 'Nhà trai'
                 WHEN 'gai'  THEN 'Nhà gái'
                 ELSE '—' END AS "Từ thiệp",
       CASE WHEN presence THEN 'Có đến' ELSE 'Không đến' END AS "Tham dự",
       comment       AS "Lời chúc",
       created_at    AS "Thời gian"
FROM loi_chuc
WHERE parent_uuid IS NULL
ORDER BY created_at DESC;
```

Đếm số khách theo từng bên:

```sql
SELECT COALESCE(phia, 'không rõ') AS "Từ thiệp", COUNT(*) AS "Số lời chúc"
FROM loi_chuc
WHERE parent_uuid IS NULL
GROUP BY phia;
```

Xoá lời chúc thử nghiệm **trước khi gửi thiệp cho khách**:

```sql
DELETE FROM loi_chuc;
```

---

## 5. Việc cần làm trước khi gửi thiệp

- [ ] Quét thử **mã QR** chú rể bằng app ngân hàng, kiểm tra đúng tên và số
- [ ] Lấy **mã QR cô dâu** từ Techcombank và gửi để thêm vào
- [ ] Xác nhận lại **ngày âm lịch** (10/08 Bính Ngọ) với người lớn trong nhà
- [ ] Đặt `ACCESS_KEY` trên cả hai project để chặn spam
- [ ] Chạy `DELETE FROM loi_chuc;` xoá dữ liệu test
- [ ] Để repo GitHub ở chế độ **Private** — mã nguồn chứa số tài khoản và địa chỉ nhà
- [ ] Gửi link cho vài người thử bằng **4G** trước khi gửi rộng

---

## Chạy thử ở máy

```bash
nvm use 24
npm run dev       # http://localhost:3000
```

Không có `DATABASE_URL` thì thiệp vẫn chạy bình thường — chỉ là lời chúc
của khách chưa lưu được, phần lời chúc đính sẵn vẫn hiển thị.
