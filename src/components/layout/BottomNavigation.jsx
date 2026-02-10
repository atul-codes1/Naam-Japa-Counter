import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'Home', path: '/', icon: '🏠' },
        { id: 'library', label: 'Library', path: '/naam-japa-counter', icon: '📿' },
        { id: 'rank', label: 'Rank', path: '/leaderboard', icon: '🏆' },
        { id: 'stats', label: 'Journey', path: '/statistics', icon: '📈' },
        { id: 'settings', label: 'Menu', action: 'toggleDrawer', icon: '☰' }
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => {
                        // Haptic feedback
                        if (navigator.vibrate) {
                            try {
                                navigator.vibrate(5); // Light tap feedback
                            } catch (e) {
                                // Ignore vibration errors
                            }
                        }

                        if (item.action === 'toggleDrawer') {
                            // We will handle drawer toggle via a custom event or shared state
                            window.dispatchEvent(new CustomEvent('toggle-drawer'));
                        } else {
                            navigate(item.path);
                        }
                    }}
                >
                    <div className="nav-icon-wrapper">
                        <span className="nav-icon">{item.icon}</span>
                        {isActive(item.path) && (
                            <motion.div
                                layoutId="nav-glow"
                                className="nav-glow"
                                transition={{ type: 'spring', duration: 0.5 }}
                            />
                        )}
                    </div>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavigation;
