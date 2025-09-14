import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const melbourneCollection = await dbConnect(collectionNameObj.melbourneCollection);
    const melbourne = await melbourneCollection.find({}).toArray();
    return NextResponse.json(melbourne, { status: 200 });
  } catch (error) {
    console.error("Error fetching melbourne:", error);
    return NextResponse.json({ error: "Failed to fetch melbourne" }, { status: 500 });
  }
}
