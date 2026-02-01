import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import OTPInput from './OTPInput';
import useAuth from '../../hooks/useAuth';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [stage, setStage] = useState('details'); // 'details' | 'otp'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const resetAll = () => {
    setMode('login');
    setStage('details');
    setPhone('');
    setName('');
    setOtp('');
  };

  const handleClose = () => {
    resetAll();
    if (onClose) onClose();
    if (!isAuthenticated) navigate('/', { replace: true });
  };

  const handleSendOtp = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    // In real app: call POST /api/auth/send-otp
    setStage('otp');
  };

  const handleVerify = () => {
    // In dev: accept any OTP
    const mockToken = 'mock-jwt-token';
    const user = { name: mode === 'register' ? (name || 'You') : (name || 'You'), phone };
    if (onLogin) onLogin(mockToken, user);
    resetAll();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('login-modal-overlay')) handleClose();
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal open" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <div className="brand">
            <div className="brand-circle">J</div>
            <div>
              <div className="login-title">Welcome</div>
              <div className="login-sub">Access Insights & Leaderboard after login</div>
            </div>
          </div>
          <button className="login-close" onClick={handleClose} aria-label="Close">×</button>
        </div>

        <div className="mode-tabs">
          <button className={`tab-pill ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setStage('details'); }}>Login</button>
          <button className={`tab-pill ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setStage('details'); }}>Register</button>
        </div>

        {mode && stage === 'details' && (
          <div>
            <div className="login-sub" style={{marginBottom:8}}>{mode === 'register' ? 'Tell us your name and phone' : 'Enter your phone to receive OTP'}</div>
            {mode === 'register' && (
              <input className="login-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            )}
            <div className="form-row">
              <div className="phone-prefix">+91</div>
              <input className="login-input" placeholder="9876543210" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div className="login-footer">
              <div className="helper-text">We will send an OTP to verify your number</div>
              <div style={{display:'flex', gap:8}}>
                <button className="login-button" onClick={handleSendOtp}>Send OTP</button>
                <button className="login-button secondary" onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {mode && stage === 'otp' && (
          <div>
            <div className="login-sub">Enter the 6-digit code sent to +91 {phone}</div>
            <OTPInput value={otp} onChange={setOtp} />
            <div className="login-footer">
              <div className="helper-text">Didn't receive code? Try again after a moment.</div>
              <div style={{display:'flex', gap:8}}>
                <button className="login-button" onClick={handleVerify}>Verify & Continue</button>
                <button className="login-button secondary" onClick={() => setStage('details')}>Back</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
