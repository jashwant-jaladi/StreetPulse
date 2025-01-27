// app/api/cart/reset/route.js
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function DELETE(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Delete all cart items for the user
    await prisma.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: 'Cart reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting cart:', error);
    return NextResponse.json(
      { error: 'Failed to reset cart' },
      { status: 500 }
    );
  }
}