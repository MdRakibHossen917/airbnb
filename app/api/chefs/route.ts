import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const chefsCollection = await dbConnect(collectionNameObj.chefsCollection);
    const chefs = await chefsCollection.find({}).toArray();
    return NextResponse.json(chefs, { status: 200 });
  } catch (error) {
    console.error("Error fetching chefs:", error);
    return NextResponse.json({ error: "Failed to fetch chefs" }, { status: 500 });
  }
}