import { db } from "@/lib/db";
import { prds } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// /api/create-pdr
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    const {    
        industry,
        company,
        description,
        strategy,
        persona,
        feature,
        pdrContent } = body;

    
    const prd_id = await db
      .insert(prds)
      .values({
        prdName: "",
        prdContent: pdrContent,
        prdQuery: industry,
        userId,
      })
      .returning({
        insertedId: prds.id,
      });

    return NextResponse.json(
      {
        pdr_id: prd_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}