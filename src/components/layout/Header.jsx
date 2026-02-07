import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

const Header = ({ activeNaam, isDesktop, onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Contextual: Show back button instead of menu if we are NOT on root
    const showBackButton = !isDesktop && (
        location.pathname.startsWith('/naam-japa-counter/') ||
        location.pathname === '/statistics' ||
        location.pathname === '/leaderboard'
    );

    const handleBack = () => navigate(-1);

    return (
        <div className={`header ${!isDesktop ? 'native-glass' : ''}`}>
            <div className="header-content">
                {!isDesktop && showBackButton && (
                    <button className="back-button" onClick={handleBack}>
                        <span className="back-icon">←</span>
                    </button>
                )}

                <div className="header-title" aria-label={`Current Mantra: ${activeNaam}`}>
                    {showBackButton ? activeNaam : `📿 ${activeNaam} Naam`}
                </div>

                <div className="header-spacer" />

                {isDesktop ? (
                    <>
                        <HoverNavButton label="Home" to="/" />
                        <HoverNavButton label="Premanand Ji" to="/premanand-ji-maharaj" />
                        <HoverNavButton label="Naam Library" to="/naam-japa-counter" />
                        <HoverNavButton label="My Journey" to="/statistics" />
                        <HoverNavButton label="My Rank" to="/leaderboard" />
                        <div className="header-auth-spacer" />
                        <HeaderAuth />
                        <div className="header-auth-spacer" />
                    </>
                ) : (
                    <div className="header-mobile-menu-container">
                        <HeaderAuth />
                    </div>
                )}
            </div>
        </div>
    );
};

const HeaderAuth = () => {
    const { user, isAuthenticated, openLogin } = useAuth();

    const handleLogout = () => {
        // Direct logout - no context needed
        console.log('Direct logout triggered');

        // Clear all Supabase keys from localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-')) {
                localStorage.removeItem(key);
            }
        });

        // Force hard reload to root
        window.location.href = '/';
    };

    if (isAuthenticated) {
        const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'You';
        return (
            <div className="header-user">
                <span className="user-name">{userName}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        );
    }
    return <button className="login-button small" onClick={openLogin}>Login</button>;
}

const HoverNavButton = ({ label, to }) => {
    return (
        <Link
            to={to}
            className="nav-button nav-button-link"
        >
            {label}
        </Link>
    );
};

export default Header;
