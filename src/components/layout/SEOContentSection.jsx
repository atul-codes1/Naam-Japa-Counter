import React from 'react';

const SEOContentSection = ({ content }) => {
    if (!content) return null;

    return (
        <div className="page-content" style={{ paddingBottom: '60px' }}>
            <div className="page-inner">
                <div className="guru-card">
                    {/* Content already contains guru-text-content, guru-title etc. from the data file */}
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </div>
    );
};

export default SEOContentSection;
