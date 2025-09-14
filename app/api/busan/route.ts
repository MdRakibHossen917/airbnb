import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const busanCollection = await dbConnect(collectionNameObj.busanCollection);
    const busan = await busanCollection.find({}).toArray();
    return NextResponse.json(busan, { status: 200 });
  } catch (error) {
    console.error("Error fetching busan:", error);
    return NextResponse.json({ error: "Failed to fetch busan" }, { status: 500 });
  }
}
