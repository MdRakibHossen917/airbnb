import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const seoulCollection = await dbConnect(collectionNameObj.seoulCollection);
    const seoul = await seoulCollection.find({}).toArray();
    return NextResponse.json(seoul);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch seoul" }, { status: 500 });
  }
}
