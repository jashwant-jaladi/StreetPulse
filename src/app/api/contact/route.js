import prisma from "@/libs/db";
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    const { firstName, lastName, email, opinion } = await request.json();

    // Server-side validation
    if (!firstName || !lastName || !email || !opinion) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 422 }
      );
    }

    // Create new contact entry
    await prisma.contact.create({
      data: { firstName, lastName, email, opinion },
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact submission:", error);
    return NextResponse.json(
      { message: "An error occurred, please try again later." },
      { status: 500 }
    );
  }
}
