import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { shopId, userId } = await req.json();

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if the item already exists in the user's wishlist (avoid duplicates)
    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_shopId: { // Correct query using the composite unique field
          shopId: parseInt(shopId, 10),
          userId: parseInt(userId, 10),
        },
      },
    });

    if (existingItem) {
      return NextResponse.json({ message: "Product already in wishlist" }, { status: 400 });
    }

    // Create a new wishlist entry
    const newItem = await prisma.wishlist.create({
      data: {
        shopId: parseInt(shopId, 10),
        userId: parseInt(userId, 10),
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error creating wishlist:", error);
    return NextResponse.json({ error: "Failed to create wishlist" }, { status: 500 });
  }
}

// Delete an item from the wishlist
export async function DELETE(req) {
  try {
    const { shopId, userId } = await req.json();

    // Ensure both userId and shopId are provided
    if (!shopId || !userId) {
      return NextResponse.json({ error: "Shop ID and User ID are required" }, { status: 400 });
    }

    // Find the wishlist item to delete
    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_shopId: { // Correct query using the composite unique field
          userId: parseInt(userId, 10),
          shopId: parseInt(shopId, 10),
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json({ message: "Product not found in wishlist" }, { status: 404 });
    }

    // Delete the wishlist entry
    const deletedItem = await prisma.wishlist.delete({
      where: {
        userId_shopId: { // Correct query for deletion using the composite unique field
          userId: parseInt(userId, 10),
          shopId: parseInt(shopId, 10),
        },
      },
    });

    return NextResponse.json({ message: "Product removed from wishlist", deletedItem });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return NextResponse.json({ error: "Failed to delete wishlist" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    // Use URL to parse searchParams
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }



    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: { shop: true },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist data", details: error.message }, { status: 500 });
  }
}
