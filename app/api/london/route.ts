import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const londonCollection = await dbConnect(collectionNameObj.londonCollection);
    const london = await londonCollection.find({}).toArray();
    return NextResponse.json(london, { status: 200 });
  } catch (error) {
    console.error("Error fetching London:", error);
    return NextResponse.json({ error: "Failed to fetch london" }, { status: 500 });
  }
}
