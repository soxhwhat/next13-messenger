import {  Conversation, Message, User } from "@prisma/client";
//FullMessageType 是 Message 类型的扩展，它添加了两个新的属性：sender 和 seen。sender 属性的类型是 User，表示消息的发送者。seen 属性的类型是 User[]，表示已经看过这条消息的用户列表。
export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};
//FullConversationType 是 Conversation 类型的扩展，它添加了两个新的属性：users 和 messages。users 属性的类型是 User[]，表示参与这个对话的用户列表。messages 属性的类型是 FullMessageType[]，表示这个对话中的消息列表，每条消息都包含发送者信息和已读用户列表。
export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};
