import prisma from "@/libs/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation: Ensure all fields are present
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 422 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long." },
        { status: 422 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.register.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.register.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully!", register: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { message: "An error occurred, please try again later." },
      { status: 500 }
    );
  }
}
