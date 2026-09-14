/**
 * GET  /api/loi-chuc  — danh sách lời chúc (mới nhất trước)
 * POST /api/loi-chuc  — gửi lời chúc mới
 *
 * Cả hai thiệp nhà trai / nhà gái gọi chung endpoint này nên lời chúc
 * dồn về một database duy nhất.
 */
import { NextResponse } from "next/server";
import { sql, khoiTao, doiDang, coDatabase } from "@/lib/db";
import type { LoiChucRow, Phia } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GIOI_HAN_TEN = 60;
const GIOI_HAN_CHUC = 1000;
const SO_LUONG_MAC_DINH = 30;

function loi(status: number, message: string) {
  return NextResponse.json({ data: null, error: message }, { status });
}

/** Khoá chống spam — chỉ kiểm tra khi ACCESS_KEY được đặt trên server */
function khoaHopLe(req: Request): boolean {
  const khoa = process.env.ACCESS_KEY;
  if (!khoa) return true;
  return req.headers.get("x-access-key") === khoa;
}

export async function GET(req: Request) {
  if (!coDatabase || !sql) {
    // Chưa cấu hình database — thiệp vẫn chạy, chỉ là không có lời chúc từ khách
    return NextResponse.json({ data: { count: 0, lists: [] }, error: null });
  }

  try {
    await khoiTao();

    const url = new URL(req.url);
    const per = Math.min(
      Math.max(Number(url.searchParams.get("per")) || SO_LUONG_MAC_DINH, 1),
      100,
    );
    const offset = Math.max(Number(url.searchParams.get("next")) || 0, 0);

    const [{ count }] = (await sql`
      SELECT COUNT(*)::int AS count FROM loi_chuc WHERE parent_uuid IS NULL
    `) as { count: number }[];

    const rows = (await sql`
      SELECT * FROM loi_chuc
      WHERE parent_uuid IS NULL
      ORDER BY created_at DESC
      LIMIT ${per} OFFSET ${offset}
    `) as LoiChucRow[];

    return NextResponse.json({
      data: { count, lists: rows.map(doiDang) },
      error: null,
    });
  } catch (e) {
    console.error("[api/loi-chuc][GET]", e);
    return loi(500, "Không tải được lời chúc, vui lòng thử lại sau");
  }
}

export async function POST(req: Request) {
  if (!coDatabase || !sql) {
    return loi(503, "Chức năng gửi lời chúc chưa sẵn sàng");
  }

  if (!khoaHopLe(req)) {
    return loi(401, "Khoá truy cập không hợp lệ");
  }

  try {
    await khoiTao();

    const body = (await req.json().catch(() => ({}))) as {
      name?: unknown;
      comment?: unknown;
      presence?: unknown;
      phia?: unknown;
    };

    const ten = String(body.name ?? "")
      .trim()
      .slice(0, GIOI_HAN_TEN);
    const noiDung = String(body.comment ?? "")
      .trim()
      .slice(0, GIOI_HAN_CHUC);

    if (ten.length < 2) {
      return loi(422, "Vui lòng nhập tên của bạn (ít nhất 2 ký tự)");
    }
    if (noiDung.length < 1) {
      return loi(422, "Vui lòng nhập lời chúc");
    }

    const phia: Phia | null =
      body.phia === "trai" || body.phia === "gai" ? body.phia : null;

    const [moi] = (await sql`
      INSERT INTO loi_chuc (own, name, phia, presence, comment)
      VALUES (
        ${crypto.randomUUID()},
        ${ten},
        ${phia},
        ${body.presence === undefined ? true : Boolean(body.presence)},
        ${noiDung}
      )
      RETURNING *
    `) as LoiChucRow[];

    return NextResponse.json(
      { data: doiDang(moi), error: null },
      { status: 201 },
    );
  } catch (e) {
    console.error("[api/loi-chuc][POST]", e);
    return loi(500, "Không gửi được lời chúc, vui lòng thử lại sau");
  }
}
