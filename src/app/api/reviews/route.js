
import prisma from "@/libs/db";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { userId, shopId, rating, content } = await request.json();

    if (!userId || !shopId || !rating || typeof rating !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }


    const existingReview = await prisma.review.findUnique({
      where: { userId_shopId: { userId, shopId } },
    });

    if (existingReview) {
      // Update existing review
      await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating, content, updatedAt: new Date() },
      });
    } else {
      // Create a new review
      await prisma.review.create({
        data: { userId, shopId, rating, content },
      });
    }

  
    const reviews = await prisma.review.findMany({ where: { shopId } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const newAverageRating = totalRating / reviews.length;

    await prisma.shop.update({
      where: { id: shopId },
      data: { rating: newAverageRating, noOfRatings: reviews.length },
    });

    return NextResponse.json({ message: "Review added/updated successfully" });
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
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
