import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const tokyoCollection = await dbConnect(collectionNameObj.tokyoCollection);
    const tokyo = await tokyoCollection.find({}).toArray();
    return NextResponse.json(tokyo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tokyo" }, { status: 500 });
  }
}
