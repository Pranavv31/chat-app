import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <MessageSquare size={28} />
          </div>
          <h1 className="auth-brand-name">ChatFlow</h1>
        </div>
        <div className="auth-tagline">
          <h2>Join thousands of<br />happy chatters.</h2>
          <p>Create your free account and start connecting with people instantly — no credit card required.</p>
        </div>
        <div className="auth-decorations">
          <div className="deco-circle deco-circle-1" />
          <div className="deco-circle deco-circle-2" />
          <div className="deco-circle deco-circle-3" />
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-card animate-fadeInUp">
          <div className="auth-card-header">
            <h2>Create account</h2>
            <p>It&apos;s free and takes less than a minute</p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" id="signup-form">
            <div className="input-group">
              <label className="input-label" htmlFor="signup-name">Full name</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  className="input-field with-icon"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-email">Email address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  id="signup-email"
                  type="email"
                  className="input-field with-icon"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-password">Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field with-icon"
                  style={{ paddingRight: '42px' }}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="signup-submit"
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? <span className="btn-spinner" /> : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
