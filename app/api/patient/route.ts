import { NextResponse } from "next/server";
import { db } from "@/db";
import { patients } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user");
  const month = searchParams.get("month");

  try {
    const result = await db.query.patients.findMany({
      where: (patients, { eq, and }) =>
        and(
          eq(patients.userId, userId || "")
          // 월별 필터링 로직 추가 예정
        ),
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, patientId, conferenceType, reasons, filePaths } = body;

    const result = await db.insert(patients).values({
      name,
      patientId,
      conferenceType,
      reasons,
      isDiscussing: false,
      isDone: false,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
