import Avatar from '../shared/Avatar';
import './UserItem.css';

export default function UserItem({ user, isSelected, isOnline, onClick }) {
  return (
    <button
      className={`user-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      id={`user-item-${user._id}`}
    >
      <Avatar
        src={user.profilePic}
        name={user.fullName}
        size={42}
        showOnline
        isOnline={isOnline}
      />
      <div className="user-item-info">
        <span className="user-item-name">{user.fullName}</span>
        <span className={`user-item-status ${isOnline ? 'status-online' : 'status-offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      {isSelected && <div className="user-item-active-bar" />}
    </button>
  );
}
