import prisma from "@/libs/db"; // Adjust the path to your Prisma client
import { NextResponse } from "next/server";

// POST: Add item to cart or update quantity if already exists
export async function POST(req) {
  try {
    const { userId, shopId, size, color, quantity } = await req.json();

    // Validate input
    if (!userId || !shopId || !size || !color || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields (userId, shopId, size, color, quantity)" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({ where: { id: parseInt(userId, 10) } });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if the item already exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId, 10),
        shopId: parseInt(shopId, 10),
        size,
        color,
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: "Item already exists in the cart. Use PATCH to update the quantity." },
        { status: 409 }
      );
    }

    // Create a new cart item
    const newItem = await prisma.cartItem.create({
      data: {
        userId: parseInt(userId, 10),
        shopId: parseInt(shopId, 10),
        size,
        color,
        quantity: parseInt(quantity, 10),
      },
    });

   
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json({ error: "Failed to process request", details: error.message }, { status: 500 });
  }
}





export async function GET(req) {
  try {
    // Get userId from searchParams
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // Validate userId
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Fetch the cart items for the user
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { shop: true }, // Optionally include related shop data
    });

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items", details: error.message }, 
      { status: 500 }
    );
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(req) {
  try {
    const { userId, shopId, size, color } = await req.json();

    // Validate input
    if (!userId || !shopId || !size || !color) {
      return NextResponse.json(
        { error: "userId, shopId, size, and color are required" }, 
        { status: 400 }
      );
    }

    // Check if the item exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId, 10),
        shopId: parseInt(shopId, 10),
        size,
        color,
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found in cart" }, 
        { status: 404 }
      );
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id: existingItem.id },
    });

    return NextResponse.json(
      { message: "Item removed from cart" }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/cart:", error);
    return NextResponse.json(
      { error: "Failed to delete item from cart", details: error.message }, 
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { userId, shopId, size, color, newQuantity } = await req.json();

    // Validate input
    if (!userId || !shopId || !size || !color || newQuantity === undefined) {
      return NextResponse.json(
        { error: "Missing required fields (userId, shopId, size, color, newQuantity)" },
        { status: 400 }
      );
    }

    // Check if the item exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId, 10),
        shopId: parseInt(shopId, 10),
        size,
        color,
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Cart item not found. Use POST to create a new item." },
        { status: 404 }
      );
    }

    // Update the quantity to the new value
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: parseInt(newQuantity, 10) },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/cart:", error);
    return NextResponse.json({ error: "Failed to process request", details: error.message }, { status: 500 });
  }
}
