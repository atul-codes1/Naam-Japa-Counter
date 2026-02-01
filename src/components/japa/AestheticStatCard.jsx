

const AestheticStatCard = ({ icon, title, value, isCompact = false }) => {
    return (
        <div className={`stat-card ${isCompact ? 'compact' : ''}`}>
            <div className="stat-card-icon">{icon}</div>
            <div className="stat-card-title">{title}</div>
            <div className="stat-card-value">{value}</div>
        </div>
    );
};

export default AestheticStatCard;
