import { MessageSquare, Sparkles } from 'lucide-react';
import './NoChatSelected.css';

export default function NoChatSelected() {
  return (
    <div className="no-chat">
      <div className="no-chat-content">
        <div className="no-chat-icon">
          <MessageSquare size={40} strokeWidth={1.5} />
          <div className="no-chat-sparkle">
            <Sparkles size={16} />
          </div>
        </div>
        <h2 className="no-chat-title">Welcome to ChatFlow</h2>
        <p className="no-chat-sub">
          Select a conversation from the sidebar to start chatting in real-time.
        </p>
        <div className="no-chat-features">
          <div className="feature-chip">⚡ Real-time messaging</div>
          <div className="feature-chip">🖼️ Image sharing</div>
          <div className="feature-chip">🟢 Online presence</div>
        </div>
      </div>
    </div>
  );
}
