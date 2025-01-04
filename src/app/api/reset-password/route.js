import prisma from "@/libs/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return new Response(JSON.stringify({ message: "Token and new password are required" }), {
      status: 400,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gte: new Date() },
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return new Response(JSON.stringify({ message: "Password reset successful" }), {
    status: 200,
  });
}
