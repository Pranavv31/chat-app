import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <MessageSquare size={18} />
          </div>
          <span className="brand-name">ChatFlow</span>
        </Link>

        {authUser && (
          <nav className="navbar-actions">
            <Link to="/profile" className="nav-btn" title="Profile">
              <User size={16} />
              <span>Profile</span>
            </Link>
            <button className="nav-btn nav-btn-danger" onClick={handleLogout} title="Logout">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
