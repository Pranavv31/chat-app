import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import './ChatContainer.css';

export default function ChatContainer() {
  const { messages, isLoadingMessages } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="chat-messages" id="chat-messages-scroll">
        {isLoadingMessages ? (
          <div className="chat-loading">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`skeleton-msg ${i % 2 === 0 ? 'skeleton-mine' : ''}`}>
                <div className="skeleton-bubble" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="chat-no-messages">
            <div className="no-messages-icon">👋</div>
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg._id} message={msg} />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
}
