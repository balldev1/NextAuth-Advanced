import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

//ตรวจสอบสถานะ Login
export default auth ((req) => {
    const isLoggedIn = !!req.auth;
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