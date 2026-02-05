import React from 'react';
import SEO from '@/components/common/SEO';

const PrivacyPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <SEO
                        title="Privacy Policy | Naam Jaap Counter"
                        description="Your data privacy is sacred to us. Read how we protect your spiritual journey's data."
                    />
                    <h1 className="guru-main-title">Privacy Policy</h1>

                    <div className="guru-card static-page-card animate-slide-up">
                        <p className="static-page-text small-mute">Your privacy is sacred to us.</p>

                        <section className="static-page-subsection">
                            <h3 className="static-page-subtitle-h3">1. Data We Collect</h3>
                            <p className="static-page-text mb-10">
                                We only collect what is strictly necessary to provide the service:
                            </p>
                            <ul className="static-page-list privacy-list">
                                <li className="static-page-text"><strong>Authentication Data:</strong> Your email address and basic profile info (via Google Login) to identify your account.</li>
                                <li className="static-page-text"><strong>Chanting Data:</strong> The counts, dates, and deity names associated with your practice.</li>
                            </ul>
                        </section>

                        <section className="static-page-subsection">
                            <h3 className="static-page-subtitle-h3">2. How We Use Your Data</h3>
                            <p className="static-page-text">
                                Your data is used exclusively to:
                                <ul className="privacy-nested-list">
                                    <li>Sync your progress across your devices.</li>
                                    <li>Display your stats on the Global Leaderboard (if you choose to participate).</li>
                                    <li>Analyze aggregate app usage to improve features.</li>
                                </ul>
                            </p>
                        </section>

                        <section className="static-page-subsection">
                            <h3 className="static-page-subtitle-h3">3. No Selling of Data</h3>
                            <p className="static-page-text">
                                We do <strong>not</strong> sell, trade, or rent your personal identification information to others. We are a spiritual initiative, not a data broker.
                            </p>
                        </section>

                        <section className="static-page-subsection">
                            <h3 className="static-page-subtitle-h3">4. Data Deletion</h3>
                            <p className="static-page-text">
                                You have the right to delete your account and all associated data at any time. Simply use the 'Delete Account' option in the settings or contact us at support@japacounter.com.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
