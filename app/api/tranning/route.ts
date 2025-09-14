import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const tranningCollection = await dbConnect(collectionNameObj.tranningCollection);
    const tranning = await tranningCollection.find({}).toArray();
    return NextResponse.json(tranning, { status: 200 });
  } catch (error) {
    console.error("Error fetching tranning:", error);
    return NextResponse.json({ error: "Failed to fetch tranning" }, { status: 500 });
  }
}