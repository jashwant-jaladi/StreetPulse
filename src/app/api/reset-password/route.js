import prisma from "@/libs/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { id, newPassword } = await req.json();

  if (!id || !newPassword) {
    return new Response(
      JSON.stringify({ message: "User ID and new password are required" }),
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }, // Ensure ID is integer
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
