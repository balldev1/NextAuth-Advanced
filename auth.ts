import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";

// เชื่อมฐานข้อมูล เอา jwt มาใช้ session
export const {
    handlers : { GET, POST },
    auth,
    signIn,
    signOut,
}
    = NextAuth({
    callbacks:{
        async jwt({token}){
            console.log({token})
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig
    });