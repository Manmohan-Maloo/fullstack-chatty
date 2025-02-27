import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-center gap-2 ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
            ref={messageEndRef}
          >
            <div className="flex-shrink-0">
              <img
                className={`w-10 h-10 rounded-full border ${
                  message.senderId === authUser._id ? "hidden" : "block"
                }`}
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
            <div
              className={`flex flex-col max-w-xs rounded-lg shadow-md ${
                message.image ? "p-0 relative" : "px-3 py-1"
              }`}
              style={{
                backgroundColor:
                  message.senderId === authUser._id
                    ? message.image
                      ? "none" // No background if there's an image
                      : "var(--primary-color)"
                    : "var(--secondary-color)",
                color:
                  message.senderId === authUser._id
                    ? "#ffffff"
                    : "var(--text-color)",
              }}
            >
              {message.image && (
                <div className="relative">
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md "
                  />
                  <div className="absolute bottom-1 right-2 text-xs font-semibold rounded text-white p-1 px-1.5 bg-gradient-to-r from-gray-500 to-gray-900">
                    <time>{formatMessageTime(message.createdAt)}</time>
                  </div>
                </div>
              )}
              {message.text && <p>{message.text}</p>}
              {!message.image && (
                <div className="text-xs pt-0.5">
                  <time>{formatMessageTime(message.createdAt)}</time>
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <img
                className={`w-10 h-10 rounded-full border ${
                  message.senderId !== authUser._id ? "hidden" : "block"
                }`}
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
