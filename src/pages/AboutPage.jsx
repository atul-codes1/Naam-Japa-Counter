import React from 'react';
import SEO from '../components/common/SEO';

const AboutPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <SEO
                        title="About Naam Jaap Counter | Our Mission"
                        description="Learn about our mission to help spiritual practitioners maintain their daily chanting vows."
                    />
                    <h1 className="guru-main-title">About Japa Counter</h1>

                    <div className="guru-card static-page-card animate-slide-up">
                        <h2 className="guru-title static-page-section-title">Our Mission</h2>
                        <p className="static-page-text">
                            Our mission is to bridge the gap between ancient spiritual practices and modern digital lifestyles. We believe that the sacred act of Naam Japa (mantra chanting) should be accessible, trackable, and beautiful, regardless of where you are in the world.
                        </p>
                        <p className="static-page-text">
                            Japa Counter is designed to be your digital bead bag—a sanctuary in your pocket that helps you maintain consistency in your spiritual journey.
                        </p>
                    </div>

                    <div className="guru-card static-page-card animate-slide-up delay-200">
                        <h2 className="guru-title static-page-section-title">The Story</h2>
                        <p className="static-page-text">
                            For centuries, devotees have used Tulsi or Rudraksha beads (Malas) to count their mantras. But in the busy modern world, carrying a physical mala isn't always possible—whether you're on a crowded train, in a corporate meeting, or walking through a city.
                        </p>
                        <p className="static-page-text">
                            We realized that many devotees were losing track of their daily vows simply because they didn't have their beads with them. This app was born from a simple question: <strong>"What if your phone could be as sacred as your mala?"</strong>
                        </p>
                        <p className="static-page-text">
                            We built Japa Counter with pure intent—no ads, no distractions, just you and the Name.
                        </p>
                    </div>

                    <div className="guru-card static-page-card mb-0 animate-slide-up delay-400">
                        <h2 className="guru-title static-page-section-title">Why Use This App?</h2>
                        <ul className="static-page-list">
                            <li className="static-page-list-item">
                                <span className="static-page-emoji-icon">✨</span>
                                <span><strong>Premium Aesthetics:</strong> A beautiful, calm interface that inspires devotion.</span>
                            </li>
                            <li className="static-page-list-item">
                                <span className="static-page-emoji-icon">📊</span>
                                <span><strong>Detailed Insights:</strong> Track your progress daily, weekly, and yearly.</span>
                            </li>
                            <li className="static-page-list-item">
                                <span className="static-page-emoji-icon">🌍</span>
                                <span><strong>Global Community:</strong> See how devotees around the world are chanting.</span>
                            </li>
                            <li className="static-page-list-item mb-0">
                                <span className="static-page-emoji-icon">🔒</span>
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
