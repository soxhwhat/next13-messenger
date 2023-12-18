import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
// otherUser 的计算过程如下：

// 从会话信息中获取当前用户的电子邮件地址。

// 使用 filter 方法从 conversation.users 中过滤出电子邮件地址不等于当前用户电子邮件地址的用户。

// 返回过滤结果的第一个元素。

// 所以，这段代码的意思是，定义了一个 useOtherUser Hook，这个 Hook 用于从对话中获取除当前用户外的其他用户。
const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();
// useMemo 钩子用于记住一个值，只有当它的依赖项发生变化时才重新计算。在这个例子中，它被用来记住 conversationId 和 isOpen。
  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
