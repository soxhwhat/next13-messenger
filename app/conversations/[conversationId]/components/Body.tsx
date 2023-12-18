'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  // 这段代码创建了一个可以指向div元素的引用，初始时这个引用没有指向任何元素。这个引用可以被赋值给div元素的ref属性，然后我们就可以在组件中访问和操作这个div元素。
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  
  const { conversationId } = useConversation();
/**
 * router.push(/conversations/${data.id}); 和 axios.post(/api/conversations/${conversationId}/seen); 这两行代码的功能是不同的。

router.push(/conversations/${data.id}); 是用于在客户端进行页面跳转的。这行代码使用 Next.js 的 router 对象的 push 方法，将用户导航到 /conversations/${data.id} 这个路径，其中 ${data.id} 是一个动态的部分，它的值是 data.id。

axios.post(/api/conversations/${conversationId}/seen); 是发送一个 POST 请求到服务器的。这行代码使用 axios 库发送一个 POST 请求到 /api/conversations/${conversationId}/seen 这个路径，其中 ${conversationId} 是一个动态的部分，它的值是 conversationId。这个请求的目的可能是告诉服务器用户已经看过了这个对话。


 */
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  // 总的来说，useEffect用于执行副作用，而useCallback用于返回记忆化的回调函数。
  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return ( 
    <div className="flex-1 overflow-y-auto">
      {/* 渲染消息列表 */}
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;