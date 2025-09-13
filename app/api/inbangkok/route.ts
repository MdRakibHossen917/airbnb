import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const inbangkokCollection = await dbConnect(collectionNameObj.inbangkokCollection);
    const inbangkok = await inbangkokCollection.find({}).toArray();
    return NextResponse.json(inbangkok, { status: 200 });
  } catch (error) {
    console.error("Error fetching inbangkok:", error);
    return NextResponse.json({ error: "Failed to fetch inbankok" }, { status: 500 });
  }
}
