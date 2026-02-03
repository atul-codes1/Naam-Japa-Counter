import React from 'react';
import LibraryCard from '../components/library/LibraryCard';
import SEO from '../components/common/SEO';
import SEOContentSection from '../components/layout/SEOContentSection';
import { libraryContent } from '../data/seoContent';

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
      <SEO
        title={libraryContent.title}
        description={libraryContent.description}
        keywords={libraryContent.keywords}
      />

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

          <div style={{ marginTop: '40px' }}>
            <SEOContentSection content={libraryContent.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaamLibraryPage;
