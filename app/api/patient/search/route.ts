import { NextResponse } from "next/server";
import { db } from "@/db";
import { patients } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const isNew = searchParams.get("isNew") === "true";
  const status = searchParams.get("status");

  try {
    const result = await db.query.patients.findMany({
      where: (patients, { eq, and, like, or }) => {
        const conditions = [];

        if (keyword) {
          conditions.push(
            or(
              like(patients.name, `%${keyword}%`),
              like(patients.patientId, `%${keyword}%`)
            )
          );
        }

        if (isNew) {
          conditions.push(eq(patients.isFastRegistered, true));
        }

        if (status === "done") {
          conditions.push(eq(patients.isDone, true));
        } else if (status === "discussing") {
          conditions.push(eq(patients.isDiscussing, true));
        }

        return and(...conditions);
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
