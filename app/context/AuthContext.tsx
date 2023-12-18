"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: React.ReactNode;
}
/**
 * 
 * @param  当你在应用中的某个位置使用 <AuthContext>{children}</AuthContext> 组件时，children 就会在用户会话的上下文中被渲染。这样，children 和它们的子组件就可以使用 next-auth/react 库提供的 useSession 钩子来访问和操作用户会话。

所以，这个声明的作用是创建一个可以在应用的任何位置访问和操作用户会话的上下文。
 * @returns 
 */
export default function AuthContext({ 
  children
}: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
