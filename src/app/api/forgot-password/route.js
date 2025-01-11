import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${user.id}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset for StreetPulse",
            text: `Click the link to reset your password: ${resetLink}`

        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in forgot password:", error);
        return NextResponse.json({ error: "An error occurred, please try again later." }, { status: 500 });
    }
}