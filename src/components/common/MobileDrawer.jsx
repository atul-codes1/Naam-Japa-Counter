import React from 'react';
import { Link } from 'react-router-dom';
import FlashingStreakChallenge from './FlashingStreakChallenge';
import PlayStoreBadge from './PlayStoreBadge';

const MobileDrawer = ({ isOpen, activeNaam, onClose }) => {
    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <div>📿 {activeNaam} Naam</div>
                </div>
                <Link to="/" className="drawer-item" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>Home</Link>
                <Link to="/premanand-ji-maharaj" className="drawer-item" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>Premanand Ji Maharaj</Link>
                <Link to="/naam-japa-counter" className="drawer-item" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>Naam Library</Link>
                <Link to="/statistics" className="drawer-item" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>Insights (Statistics)</Link>
                <Link to="/leaderboard" className="drawer-item" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>Leaderboard</Link>
                <div className="drawer-divider" />
                <div style={{ padding: '16px' }}>
                    <FlashingStreakChallenge />
                </div>
                <div style={{ height: '10px' }} />
                <div style={{ display: 'flex', justifyContent: 'left', padding: '16px' }}>
                    <PlayStoreBadge />
                </div>
            </div>
        </>
    );
};

export default MobileDrawer;
