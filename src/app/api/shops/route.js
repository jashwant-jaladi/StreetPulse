// /app/api/shop/route.js
import prisma from "@/libs/db"; // Adjust the import path to your Prisma setup
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch shop data from the database
    const shops = await prisma.shop.findMany();

    // Return the data as JSON
    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error("Error fetching shop data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch shop data" },
      { status: 500 }
    );
  }
}
