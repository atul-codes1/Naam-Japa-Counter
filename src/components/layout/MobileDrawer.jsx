import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MobileDrawer = ({ isOpen, activeNaam, onClose }) => {
    const { user, isAuthenticated, openLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Get user display name
    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Devotee';
    const userInitial = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        // Clear Supabase keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-')) {
                localStorage.removeItem(key);
            }
        });
        window.location.href = '/';
    };

    const handleLeaderboardClick = () => {
        onClose();
        if (isAuthenticated) {
            navigate('/leaderboard');
        } else {
            console.log("Global Rank clicked -> Guest -> Opening Login");
            openLogin();
        }
    };

    return (
        <>
            <div
                className={`drawer-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />
            <div className={`drawer ${isOpen ? 'open' : ''}`}>

                {/* 1. Modern Header */}
                <div className="drawer-header-modern">
                    <div className="drawer-user-info">
                        <div className="drawer-avatar">
                            {isAuthenticated ? userInitial : '🕉️'}
                        </div>
                        <div className="drawer-user-text">
                            <div className="drawer-greeting">Radhe Radhe</div>
                            <div className="drawer-username">
                                {isAuthenticated ? userName : 'Guest'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Navigation Links */}
                <div className="drawer-content">
                    <div className="drawer-section-title">Menu</div>

                    <DrawerLink
                        to="/"
                        icon="🏠"
                        label="Home"
                        isActive={location.pathname === '/'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        to="/premanand-ji-maharaj"
                        icon="🙏"
                        label="Premanand Ji"
                        isActive={location.pathname === '/premanand-ji-maharaj'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        to="/naam-japa-counter"
                        icon="📿"
                        label="Naam Library"
                        isActive={location.pathname.startsWith('/naam-japa-counter')}
                        onClick={onClose}
                    />

                    <div className="drawer-divider-modern" />

                    <div className="drawer-section-title">Progress</div>

                    <DrawerLink
                        to="/statistics"
                        icon="📈"
                        label="My Journey"
                        isActive={location.pathname === '/statistics'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        // No 'to' means it acts as a button
                        icon="🏆"
                        label="Global Rank"
                        isActive={location.pathname === '/leaderboard'}
                        onClick={handleLeaderboardClick}
                    />
                </div>

                {/* 3. Footer Actions */}
                <div className="drawer-footer">
                    {isAuthenticated ? (
                        <button className="drawer-auth-btn logout" onClick={handleLogout}>
                            <span style={{ marginRight: '8px' }}>🚪</span> Logout
                        </button>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => { onClose(); openLogin(); }}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <span style={{ marginRight: '8px' }}>✨</span> Login to Save
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

const DrawerLink = ({ to, icon, label, isActive, onClick }) => {
    // If 'to' is provided, it's a Link
    if (to) {
        return (
            <Link
                to={to}
                className={`drawer-link-modern ${isActive ? 'active' : ''}`}
                onClick={onClick}
            >
                <div className="drawer-link-left">
                    <span className="drawer-link-icon">{icon}</span>
                    <span className="drawer-link-label">{label}</span>
                </div>
                {isActive && <div className="drawer-active-dot" />}
            </Link>
        );
    }

    // Otherwise it's a clickable div (acting as button)
    return (
        <div
            className={`drawer-link-modern ${isActive ? 'active' : ''}`}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="drawer-link-left">
                <span className="drawer-link-icon">{icon}</span>
                <span className="drawer-link-label">{label}</span>
            </div>
            {isActive && <div className="drawer-active-dot" />}
        </div>
    );
};

export default MobileDrawer;
