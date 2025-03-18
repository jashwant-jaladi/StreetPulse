// /app/api/shop/route.js
import prisma from "@/libs/db"; // Adjust the import path to your Prisma setup
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // Disable caching

export async function GET() {
  try {
    // Fetch shop data from the database
    const shops = await prisma.shop.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Return the data as JSON with no-cache headers
    return NextResponse.json(shops, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error("Error fetching shop data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch shop data" },
      { status: 500 }
    );
  }
}
