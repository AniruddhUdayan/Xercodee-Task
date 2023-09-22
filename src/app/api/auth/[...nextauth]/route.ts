import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/dbConfig/dbConfig";
import { error } from "console";
import User from "@/models/userModel";
import { compare } from 'bcryptjs'

connect()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" }, // Define email and password here
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }
        
        connect().catch((err) => {
          console.error("Connection failed", err);
          throw new Error("Connection failed");
        });

        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user found. Please sign up.");
        }
        const checkPassword = await compare(credentials.password, result.password);
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or password doesn't match");
        }
        return result;
      },
    })
  ]
});

export { handler as GET, handler as POST };
