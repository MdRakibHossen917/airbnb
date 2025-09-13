import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const originalsCollection = await dbConnect(collectionNameObj.originalsCollection);
    const originals = await originalsCollection.find({}).toArray();
    return NextResponse.json(originals, { status: 200 });
  } catch (error) {
    console.error("Error fetching originals:", error);
    return NextResponse.json({ error: "Failed to fetch originals" }, { status: 500 });
  }
}
