import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import useAuth from '../../hooks/useAuth';

const LoginModal = ({ isOpen, onClose }) => {
  const { isAuthenticated, signInWithGoogle, isSyncing } = useAuth();
  const navigate = useNavigate();

  const [liveCount, setLiveCount] = React.useState("10,480");

  React.useEffect(() => {
    if (isOpen) {
      // Random number between 10,500 and 22,000
      const count = Math.floor(Math.random() * 11500) + 10500;
      setLiveCount(count.toLocaleString());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
    if (!isAuthenticated) navigate('/', { replace: true });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('login-modal-overlay')) handleClose();
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-pro open" onClick={(e) => e.stopPropagation()}>

        <div className="login-pro-content">
          {/* Header */}
          <div className="pro-header">
            <div className="pro-icon-circle">📿</div>
            <h2 className="pro-title">Radhe Radhe</h2>
            <p className="pro-subtitle">Sign in to save your progress</p>
          </div>

          {isSyncing ? (
            <div className="sync-container-pro">
              <div className="pro-spinner"></div>
              <p className="sync-text-pro">Syncing data...</p>
            </div>
          ) : (
            <>
              {/* Stats Preview */}
              <div className="pro-features">
                <div className="pro-feature">
                  <span className="pro-feat-icon">📈</span>
                  <span>My Journey</span>
                </div>
                <div className="pro-divider-vertical"></div>
                <div className="pro-feature">
                  <span className="pro-feat-icon">☁️</span>
                  <span>Backup</span>
                </div>
                <div className="pro-divider-vertical"></div>
                <div className="pro-feature">
                  <span className="pro-feat-icon">🏆</span>
                  <span>Rank</span>
                </div>
              </div>

              {/* Live Status */}
              <div className="pro-live-status">
                <span className="pro-dot"></span>
                {liveCount} chanting now
              </div>

              {/* Social Login */}
              <button
                className="google-btn-pro"
                onClick={signInWithGoogle}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" width="18" height="18" />
                <span>Continue with Google</span>
              </button>

              <button className="text-btn-pro" onClick={handleClose}>
                Continue as Guest
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
