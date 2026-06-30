import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, Shield, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/shared/Avatar';
import './ProfilePage.css';

export default function ProfilePage() {
  const { authUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setIsUploading(true);
      setSuccessMsg('');
      setError('');
      try {
        await updateProfile(reader.result);
        setSuccessMsg('Profile picture updated successfully!');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update profile picture.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="profile-page">
      <div className="profile-container animate-fadeInUp">
        {/* Back button */}
        <button className="profile-back" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to chats
        </button>

        <h1 className="profile-title">My Profile</h1>
        <p className="profile-sub">Manage your account information</p>

        {/* Avatar section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrap">
            <Avatar
              src={authUser?.profilePic}
              name={authUser?.fullName}
              size={100}
            />
            <button
              className="avatar-camera-btn"
              onClick={() => fileRef.current?.click()}
              disabled={isUploading}
              title="Change profile picture"
              id="profile-pic-btn"
            >
              {isUploading ? (
                <span className="btn-spinner" style={{ width: 14, height: 14 }} />
              ) : (
                <Camera size={16} />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <p className="avatar-hint">
            {isUploading ? 'Uploading...' : 'Click camera to update photo'}
          </p>
          {successMsg && <p className="profile-success">{successMsg}</p>}
          {error && <p className="profile-error">{error}</p>}
        </div>

        {/* Info cards */}
        <div className="profile-info-grid">
          <div className="profile-info-card">
            <div className="info-card-icon">
              <User size={18} />
            </div>
            <div className="info-card-content">
              <span className="info-card-label">Full Name</span>
              <span className="info-card-value">{authUser?.fullName}</span>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">
              <Mail size={18} />
            </div>
            <div className="info-card-content">
              <span className="info-card-label">Email Address</span>
              <span className="info-card-value">{authUser?.email}</span>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="profile-details-card">
          <h3 className="details-title">
            <Shield size={16} />
            Account Details
          </h3>
          <div className="details-row">
            <span className="details-label">Member Since</span>
            <span className="details-value">{memberSince}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Account Status</span>
            <span className="details-value status-active">
              <span className="status-dot" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
