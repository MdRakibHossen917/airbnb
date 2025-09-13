import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const bangkokCollection = await dbConnect(collectionNameObj.bangkokCollection);
    const bangkok = await bangkokCollection.find({}).toArray();
    return NextResponse.json(bangkok, { status: 200 });
  } catch (error) {
    console.error("Error fetching Bangkok:", error);
    return NextResponse.json({ error: "Failed to fetch bangkok" }, { status: 500 });
  }
}
