import { withAuth } from "next-auth/middleware";
// 对所有以 "/conversations" 和 "/users" 开头的路由进行身份验证，如果用户未登录，就重定向到根页面。
export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = { 
  matcher: [
    "/conversations/:path*",
    "/users/:path*",
    "/transition/:path*",
  ]
};
