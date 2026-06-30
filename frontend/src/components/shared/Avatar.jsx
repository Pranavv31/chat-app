import './Avatar.css';

export default function Avatar({ src, name, size = 40, showOnline = false, isOnline = false }) {
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="avatar-wrapper" style={{ '--avatar-size': `${size}px` }}>
      <div className="avatar">
        {src ? (
          <img src={src} alt={name || 'avatar'} className="avatar-img" />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </div>
      {showOnline && (
        <span className={`avatar-status ${isOnline ? 'online' : 'offline'}`} />
      )}
    </div>
  );
}
