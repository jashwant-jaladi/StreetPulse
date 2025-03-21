import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // Disable caching

export async function POST(request) {
  try {
    const { userId, shopId, rating, content } = await request.json();

    if (!userId || !shopId || !rating || typeof rating !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      // Check if the review exists
      const existingReview = await prisma.review.findUnique({
        where: { userId_shopId: { userId, shopId } },
      });

      // Add or update the review
      const newReview = existingReview
        ? await prisma.review.update({
            where: { id: existingReview.id },
            data: { rating, content, updatedAt: new Date() },
            include: { 
              user: { select: { name: true } },
              shop: { select: { rating: true, noOfRatings: true } }
            },
          })
        : await prisma.review.create({
            data: { userId, shopId, rating, content },
            include: { 
              user: { select: { name: true } },
              shop: { select: { rating: true, noOfRatings: true } }
            },
          });

      // Get all reviews for this shop
      const reviews = await prisma.review.findMany({ 
        where: { shopId },
        select: { rating: true }
      });

      // Calculate new average rating
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const newAverageRating = parseFloat((totalRating / reviews.length).toFixed(2));

      // Update the shop with the new rating and number of ratings
      const updatedShop = await prisma.shop.update({
        where: { id: shopId },
        data: { 
          rating: newAverageRating, 
          noOfRatings: reviews.length 
        },
      });

      return {
        review: newReview,
        shop: updatedShop,
      };
    });

    return NextResponse.json({
      message: "Review added/updated successfully",
      ...result
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get("shopId");

    if (!shopId) {
      return NextResponse.json({ error: "Shop ID is required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { shopId: parseInt(shopId, 10) },
      include: { user: { select: { name: true } } },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
