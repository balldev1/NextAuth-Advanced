import NextAuth, {type DefaultSession} from "next-auth";
import { UserRole } from "@prisma/client";

// SESSION
// type role
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
};

// add module => user.role
declare module "next-auth"{
    interface Session {
      user: ExtendedUser;
    }
}

//TOKEN
// import { JWT } from "@auth/core/jwt";
//
// declare module "next-auth/jwt" {
//     interface JWT {
//         role?: "ADMIN" | "USER"
//     }
// }