import { useAuth } from '../../context/AuthContext';
import './MessageBubble.css';

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message }) {
  const { authUser } = useAuth();
  const isMine = message.senderId === authUser._id;

  return (
    <div className={`message-bubble-wrapper ${isMine ? 'mine' : 'theirs'}`}>
      <div className={`message-bubble ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}>
        {message.image && (
          <div className="message-image-wrap">
            <img
              src={message.image}
              alt="Shared image"
              className="message-image"
              onClick={() => window.open(message.image, '_blank')}
            />
          </div>
        )}
        {message.text && (
          <p className="message-text">{message.text}</p>
        )}
        <span className="message-time">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}
