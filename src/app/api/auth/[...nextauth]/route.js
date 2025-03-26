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
        guest: { label: "Is Guest", type: "checkbox" },
      },

      async authorize(credentials) {
        // Handle guest user login
        if (credentials?.guest) {
          let guestUser = await prisma.user.findFirst({
            where: { guest: true },
            select: { id: true, name: true, email: true, guest: true }, // Select only necessary fields
          });

          if (!guestUser) {
            guestUser = await prisma.user.create({
              data: {
                name: "Guest",
                email: `guest_${Date.now()}@example.com`,
                guest: true,
                password: await bcrypt.hash("guest", 10), // Hash password for security
              },
              select: { id: true, name: true, email: true, guest: true },
            });
          }

          return guestUser;
        }

        // Ensure email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Find user in the database by email (excluding password)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, name: true, email: true, password: true, guest: true },
        });

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Check password validity
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        // Return only necessary user data
        return { id: user.id, name: user.name, email: user.email, guest: user.guest };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for scalability
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the JWT token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.guest = user.guest || false;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session object
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.guest = token.guest;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
