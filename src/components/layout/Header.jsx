import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const Header = ({ activeNaam, isDesktop, onMenuClick }) => {
    return (
        <div className="header">
            <div className="header-content">
                <div className="header-title" aria-label={`Current Mantra: ${activeNaam}`}>📿 {activeNaam} Naam</div>
                <div className="header-spacer" />
                {isDesktop ? (
                    <>
                        <HoverNavButton label="Home" to="/" />
                        <HoverNavButton label="Premanand Ji" to="/premanand-ji-maharaj" />
                        <HoverNavButton label="Naam Library" to="/naam-japa-counter" />
                        <HoverNavButton label="My Journey" to="/statistics" />
                        <HoverNavButton label="Global Rank" to="/leaderboard" />
                        <div style={{ width: '18px' }} />
                        <HeaderAuth />
                        <div style={{ width: '18px' }} />
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button className="menu-button" onClick={onMenuClick}>
                            <span className="menu-icon">☰</span>
                        </button>
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
    const [isHovered, setIsHovered] = useState(false);
    const { isAuthenticated, openLogin } = useAuth();

    const handleClick = (e) => {
        // protect statistics and leaderboard links by opening the login modal
        if (!isAuthenticated && (to === '/statistics' || to === '/leaderboard')) {
            e.preventDefault();
            openLogin(to);
        }
    };

    return (
        <Link
            to={to}
            className="nav-button"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderColor: isHovered ? '#FF80AB' : 'transparent',
                color: isHovered ? '#FF80AB' : 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {label}
        </Link>
    );
};

export default Header;
