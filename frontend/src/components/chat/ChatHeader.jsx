import { X, Phone, Video } from 'lucide-react';
import Avatar from '../shared/Avatar';
import { useChat } from '../../context/ChatContext';
import './ChatHeader.css';

export default function ChatHeader() {
  const { selectedUser, selectUser, onlineUsers } = useChat();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="chat-header">
      <div className="chat-header-user">
        <Avatar
          src={selectedUser?.profilePic}
          name={selectedUser?.fullName}
          size={40}
          showOnline
          isOnline={isOnline}
        />
        <div className="chat-header-info">
          <h3 className="chat-header-name">{selectedUser?.fullName}</h3>
          <span className={`chat-header-status ${isOnline ? 'status-online' : 'status-offline'}`}>
            {isOnline ? 'Active now' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="chat-header-actions">
        <button className="btn btn-icon" title="Voice call" disabled>
          <Phone size={16} />
        </button>
        <button className="btn btn-icon" title="Video call" disabled>
          <Video size={16} />
        </button>
        <button
          className="btn btn-icon"
          title="Close chat"
          onClick={() => selectUser(null)}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
