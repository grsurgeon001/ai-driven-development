import { NextResponse } from "next/server";
import { db } from "@/db";
import { patients } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, patientId } = body;

    const result = await db.insert(patients).values({
      name,
      patientId,
      isFastRegistered: true,
      isDiscussing: false,
      isDone: false,
    });

    return NextResponse.json({ success: true, patientId: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
