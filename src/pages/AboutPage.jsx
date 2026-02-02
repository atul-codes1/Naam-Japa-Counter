import React from 'react';

const AboutPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title">About Japa Counter</h1>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto 30px' }}>
                        <h2 className="guru-title" style={{ fontSize: '24px', marginBottom: '20px', color: '#880E4F' }}>Our Mission</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '20px' }}>
                            Our mission is to bridge the gap between ancient spiritual practices and modern digital lifestyles. We believe that the sacred act of Naam Japa (mantra chanting) should be accessible, trackable, and beautiful, regardless of where you are in the world.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444' }}>
                            Japa Counter is designed to be your digital bead bag—a sanctuary in your pocket that helps you maintain consistency in your spiritual journey.
                        </p>
                    </div>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto 30px' }}>
                        <h2 className="guru-title" style={{ fontSize: '24px', marginBottom: '20px', color: '#880E4F' }}>The Story</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '20px' }}>
                            For centuries, devotees have used Tulsi or Rudraksha beads (Malas) to count their mantras. But in the busy modern world, carrying a physical mala isn't always possible—whether you're on a crowded train, in a corporate meeting, or walking through a city.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '20px' }}>
                            We realized that many devotees were losing track of their daily vows simply because they didn't have their beads with them. This app was born from a simple question: <strong>"What if your phone could be as sacred as your mala?"</strong>
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444' }}>
                            We built Japa Counter with pure intent—no ads, no distractions, just you and the Name.
                        </p>
                    </div>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="guru-title" style={{ fontSize: '24px', marginBottom: '20px', color: '#880E4F' }}>Why Use This App?</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ marginRight: '10px', color: '#D81B60' }}>✨</span>
                                <span><strong>Premium Aesthetics:</strong> A beautiful, calm interface that inspires devotion.</span>
                            </li>
                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ marginRight: '10px', color: '#D81B60' }}>📊</span>
                                <span><strong>Detailed Insights:</strong> Track your progress daily, weekly, and yearly.</span>
                            </li>
                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ marginRight: '10px', color: '#D81B60' }}>🌍</span>
                                <span><strong>Global Community:</strong> See how devotees around the world are chanting.</span>
                            </li>
                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '0', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ marginRight: '10px', color: '#D81B60' }}>🔒</span>
                                <span><strong>Private & Secure:</strong> Your spiritual journey is personal. We respect your data privacy strictly.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
