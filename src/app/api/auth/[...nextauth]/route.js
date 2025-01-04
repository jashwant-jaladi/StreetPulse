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
          const guestUser = await prisma.user.create({
            data: {
              name: "Guest",
              email: `guest_${Date.now()}@example.com`,
              guest: true,
              password: "guest",
            },
          });

          return {
            id: guestUser.id,
            name: guestUser.name,
            email: guestUser.email,
          };
        }

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

        // Return user data for the session and JWT
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
    strategy: "jwt", // Use JWT for sessions
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
