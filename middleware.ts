import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "@/routes"

const { auth } = NextAuth(authConfig);

//ตรวจสอบสถานะ Login
export default auth((req)=> {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // if api/auth => return => true
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // if pathname dashboard =>  publicRoutes.includes => '/dashboard ' => true
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // "/auth/login", "/auth/register" => true
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

   if(isApiAuthRoute){
       return null;
   }

    if(isAuthRoute){
        // ถ้าเข้าสู่ระบบให้ไปหน้า /setting
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    // !logged , publie.false => /auth/login
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    console.log("ROUTE: ", req.nextUrl.pathname);
    console.log("IS LOGGEDIN: ", isLoggedIn);
})


export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).+)", // เส้นทางทั่วไปที่ไม่ใช่ไฟล์ส่วนใหญ่หรือ _next
        "/",
        "/(api|trpc)(.+)" // เส้นทางที่เกี่ยวกับ API หรือ TRPC
    ]
}