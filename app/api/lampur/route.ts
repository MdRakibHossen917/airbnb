import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const lampurCollection = await dbConnect(collectionNameObj.lampurCollection);
    const lampur = await lampurCollection.find({}).toArray();
    return NextResponse.json(lampur, { status: 200 });
  } catch (error) {
    console.error("Error fetching lampur:", error);
    return NextResponse.json({ error: "Failed to fetch lampur" }, { status: 500 });
  }
}
