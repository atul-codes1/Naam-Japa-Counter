import React from 'react';

const PlayStoreBadge = () => {
    return (
        <div className="play-store-badge" onClick={() => { }}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                style={{ height: '44px', borderRadius: '4px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        </div>
    );
};

export default PlayStoreBadge;
