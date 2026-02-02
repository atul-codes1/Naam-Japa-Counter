import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MobileDrawer = ({ isOpen, activeNaam, onClose }) => {
    const { user, isAuthenticated, openLogin } = useAuth();
    const location = useLocation();

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
                            <div className="drawer-greeting">Radhe Radhe,</div>
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
                        onClose={onClose}
                    />
                    <DrawerLink
                        to="/premanand-ji-maharaj"
                        icon="🙏"
                        label="Premanand Ji"
                        isActive={location.pathname === '/premanand-ji-maharaj'}
                        onClose={onClose}
                    />
                    <DrawerLink
                        to="/naam-japa-counter"
                        icon="📿"
                        label="Naam Library"
                        isActive={location.pathname.startsWith('/naam-japa-counter')}
                        onClose={onClose}
                    />

                    <div className="drawer-divider-modern" />

                    <div className="drawer-section-title">Progress</div>

                    <DrawerLink
                        to="/statistics"
                        icon="📈"
                        label="My Journey"
                        isActive={location.pathname === '/statistics'}
                        onClose={onClose}
                    />
                    <DrawerLink
                        to="/leaderboard"
                        icon="🏆"
                        label="Global Rank"
                        isActive={location.pathname === '/leaderboard'}
                        onClose={onClose}
                    />
                </div>

                {/* 3. Footer Actions */}
                <div className="drawer-footer">
                    {isAuthenticated ? (
                        <button className="drawer-auth-btn logout" onClick={handleLogout}>
                            <span style={{ marginRight: '8px' }}>🚪</span> Logout
                        </button>
                    ) : (
                        <button className="drawer-auth-btn login" onClick={() => { onClose(); openLogin(); }}>
                            <span style={{ marginRight: '8px' }}>✨</span> Login to Save
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

const DrawerLink = ({ to, icon, label, isActive, onClose }) => (
    <Link
        to={to}
        className={`drawer-link-modern ${isActive ? 'active' : ''}`}
        onClick={onClose}
    >
        <div className="drawer-link-left">
            <span className="drawer-link-icon">{icon}</span>
            <span className="drawer-link-label">{label}</span>
        </div>
        {isActive && <div className="drawer-active-dot" />}
    </Link>
);

export default MobileDrawer;
