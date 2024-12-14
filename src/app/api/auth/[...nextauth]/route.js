import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/myAccount",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Ensure email and password are provided
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                // Find user in the database by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // If no user found or password mismatch, throw an error
                if (!user) {
                    throw new Error("No user found with the provided email.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid password.");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    });

export { handler as GET, handler as POST };