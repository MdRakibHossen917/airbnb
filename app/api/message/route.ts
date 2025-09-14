import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const messageCollection = await dbConnect(collectionNameObj.messageCollection);
    const message = await messageCollection.find({}).toArray();
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 });
  }
}