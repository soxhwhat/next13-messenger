import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  //useMemo 钩子用于记住 routes 数组，只有当 pathname 或 conversationId 发生变化时才重新计算。
  /**
   * 第一个对象代表 "Chat" 路由，当 pathname 等于 '/conversations' 或 conversationId 存在时，这个路由是激活状态。
   * 第二个对象代表 "Users" 路由，当 pathname 等于 '/users' 时，这个路由是激活状态。
   * 第三个对象代表 "Logout" 路由，点击这个路由会调用 signOut 函数进行登出操作
   */
  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/conversations', 
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: HiUsers, 
      active: pathname === '/users'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;
