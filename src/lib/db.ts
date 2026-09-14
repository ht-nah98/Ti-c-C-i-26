/**
 * Kết nối Postgres (Neon) cho phần lời chúc.
 *
 * Cả hai thiệp (nhà trai / nhà gái) dùng chung một database, phân biệt
 * nguồn khách bằng cột `phia`. Lời chúc của bên nào cũng hiện ở cả hai
 * thiệp — đúng tinh thần một đám cưới chung.
 */
import { neon } from "@neondatabase/serverless";

/** Nhận chuỗi kết nối dù tạo database theo cách nào */
const chuoiKetNoi =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.POSTGRES_URL_NON_POOLING;

if (!chuoiKetNoi && process.env.NODE_ENV === "production") {
  console.error(
    "[db] Thiếu biến môi trường DATABASE_URL / POSTGRES_URL — API lời chúc sẽ không chạy",
  );
}

export const coDatabase = Boolean(chuoiKetNoi);

export const sql = chuoiKetNoi ? neon(chuoiKetNoi) : null;

export type Phia = "trai" | "gai";

export interface LoiChucRow {
  uuid: string;
  parent_uuid: string | null;
  own: string;
  name: string;
  phia: Phia | null;
  presence: boolean;
  comment: string;
  is_admin: boolean;
  like_count: number;
  created_at: string;
}

let daKhoiTao = false;

/** Tạo bảng nếu chưa có. Chỉ chạy một lần mỗi lần khởi động tiến trình. */
export async function khoiTao(): Promise<void> {
  if (daKhoiTao || !sql) return;

  await sql`
    CREATE TABLE IF NOT EXISTS loi_chuc (
      uuid        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      parent_uuid UUID REFERENCES loi_chuc(uuid) ON DELETE CASCADE,
      own         TEXT        NOT NULL,
      name        TEXT        NOT NULL,
      phia        TEXT,
      presence    BOOLEAN     NOT NULL DEFAULT TRUE,
      comment     TEXT        NOT NULL,
      is_admin    BOOLEAN     NOT NULL DEFAULT FALSE,
      like_count  INTEGER     NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Bảng có thể đã tồn tại từ bản undangan cũ — bổ sung cột nếu thiếu
  await sql`ALTER TABLE loi_chuc ADD COLUMN IF NOT EXISTS phia TEXT`;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_loi_chuc_parent
    ON loi_chuc (parent_uuid, created_at DESC)
  `;

  daKhoiTao = true;
}

/** Chuẩn hoá một dòng để trả về cho trình duyệt */
export function doiDang(d: LoiChucRow) {
  return {
    uuid: d.uuid,
    name: d.name,
    phia: d.phia,
    presence: d.presence,
    comment: d.comment,
    created_at: d.created_at,
    like_count: d.like_count,
  };
}
