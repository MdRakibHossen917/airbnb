import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const productsCollection = await dbConnect(collectionNameObj.productsCollection);
    const products = await productsCollection.find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
