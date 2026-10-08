import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid credentials or unauthorized account.');
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div className="fl-admin-login-page">
      <div className="fl-admin-login-container">
        
        <div className="fl-admin-login-header">
          <div className="fl-admin-badge">
            <Shield size={16} />
            <span>FOUNDERSLAB CMS</span>
          </div>
          <h1 className="fl-admin-login-title">Institutional Portal</h1>
          <p className="fl-admin-login-subtitle">
            Sign in with authorized administrator credentials to manage website media and gallery collections.
          </p>
        </div>

        {errorMsg && (
          <div className="fl-admin-error-box">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="fl-admin-login-form">
          <div className="fl-admin-field">
            <label htmlFor="admin-email">Admin Email Address</label>
            <div className="fl-admin-input-wrapper">
              <Mail size={18} className="fl-input-icon" />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@founderslab.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="fl-admin-field">
            <label htmlFor="admin-password">Secure Password</label>
            <div className="fl-admin-input-wrapper">
              <Lock size={18} className="fl-input-icon" />
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="fl-admin-submit-btn"
          >
            {submitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>ACCESS DASHBOARD</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="fl-admin-login-footer">
          <button type="button" onClick={onBackToHome} className="fl-admin-back-btn">
            ← Return to Public Website
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
