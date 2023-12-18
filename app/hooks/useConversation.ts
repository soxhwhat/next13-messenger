import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  //useMemo 钩子用于记住一个值，只有当它的依赖项发生变化时才重新计算。在这个例子中，它被用来记住 conversationId 和 isOpen。
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  //isOpen 是一个布尔值，表示对话是否打开。如果 conversationId 存在，就返回 true，否则返回 false。
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  //最后，useConversation 钩子返回一个包含 isOpen 和 conversationId 的对象。
  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId]);
};

export default useConversation;
