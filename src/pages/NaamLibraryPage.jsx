import React from 'react';
import LibraryCard from '../components/library/LibraryCard';

const NaamLibraryPage = ({ onSelectNaam }) => {
  const deities = [
    { name: 'Radha', hindi: 'राधा', icon: '🌸' },
    { name: 'Ram', hindi: 'राम', icon: '🏹' },
    { name: 'Krishna', hindi: 'कृष्ण', icon: '🪈' },
    { name: 'Shiv', hindi: 'शिव', icon: '🔱' },
    { name: 'Narayan', hindi: 'नारायण', icon: '🐚' },
  ];

  return (
    <div className="library-container">
      <div className="library-content">
        <div className="library-inner">
          <h2 className="library-title">Choose Your Mantra</h2>

          <div className="library-grid">
            {deities.map((deity, index) => (
              <LibraryCard
                key={deity.name}
                deity={deity}
                index={index}
                onSelect={onSelectNaam}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaamLibraryPage;
