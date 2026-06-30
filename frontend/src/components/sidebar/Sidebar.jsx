import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import UserItem from './UserItem';
import Avatar from '../shared/Avatar';
import { Users, Search } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const { users, selectedUser, selectUser, onlineUsers, isLoadingUsers } = useChat();
  const { authUser } = useAuth();
  const [search, setSearch] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filtered = users.filter((u) => {
    const matchSearch = u.fullName.toLowerCase().includes(search.toLowerCase());
    const matchOnline = showOnlineOnly ? onlineUsers.includes(u._id) : true;
    return matchSearch && matchOnline;
  });

  const onlineCount = users.filter((u) => onlineUsers.includes(u._id)).length;

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Users size={18} />
          <span>Messages</span>
        </div>
        <span className="online-badge">
          <span className="online-dot" />
          {onlineCount} online
        </span>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <div className="input-wrapper">
          <Search size={15} className="input-icon" />
          <input
            type="text"
            placeholder="Search people..."
            className="input-field with-icon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Online filter */}
      <div className="sidebar-filter">
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span>Online only</span>
        </label>
      </div>

      {/* User list */}
      <div className="sidebar-list">
        {isLoadingUsers ? (
          <div className="sidebar-loading">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-user">
                <div className="skeleton-avatar" />
                <div className="skeleton-info">
                  <div className="skeleton-line skeleton-name" />
                  <div className="skeleton-line skeleton-sub" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="sidebar-empty">
            <p>{search ? 'No users found' : 'No other users yet'}</p>
          </div>
        ) : (
          filtered.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              isOnline={onlineUsers.includes(user._id)}
              onClick={() => selectUser(user)}
            />
          ))
        )}
      </div>

      {/* Footer — current user */}
      <div className="sidebar-footer">
        <Avatar src={authUser?.profilePic} name={authUser?.fullName} size={34} />
        <div className="footer-info">
          <p className="footer-name">{authUser?.fullName}</p>
          <p className="footer-email">{authUser?.email}</p>
        </div>
      </div>
    </aside>
  );
}
