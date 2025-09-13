import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const torontoCollection = await dbConnect(collectionNameObj.torontoCollection);
    const toronto = await torontoCollection.find({}).toArray();
    return NextResponse.json(toronto, { status: 200 });
  } catch (error) {
    console.error("Error fetching toronto:", error);
    return NextResponse.json({ error: "Failed to fetch toronto" }, { status: 500 });
  }
}
