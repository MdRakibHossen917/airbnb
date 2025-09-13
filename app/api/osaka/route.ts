import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const osakaCollection = await dbConnect(collectionNameObj.osakaCollection);
    const osaka = await osakaCollection.find({}).toArray();
    return NextResponse.json(osaka);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch osaka" }, { status: 500 });
  }
}
