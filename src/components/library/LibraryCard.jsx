

const LibraryCard = ({ deity, index, onSelect }) => {
    return (
        <div
            className="library-card"
            onClick={() => onSelect && onSelect(deity.name)}
            role="button"
            aria-label={`Select ${deity.name} for Japa Chanting`}
        >
            <div className="library-card-icon">{deity.icon}</div>
            <div className="library-card-hindi">{deity.hindi}</div>
            <div className="library-card-name">{deity.name}</div>
        </div>
    );
};

export default LibraryCard;
