import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create the transporter for nodemailer using Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            logger: true,  // Enables logging for debugging
            debug: true,   // Set this to true to get detailed logs
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Order Confirmation",
            Text: "Thank you for your purchase! We are excited to let you know that your order has been successfully placed. Our team is now preparing your items for shipment. You will receive an email notification once your order is on its way. If you have any questions or need further assistance, feel free to contact our customer support team. We appreciate your business and look forward to serving you again!"

        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
