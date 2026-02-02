import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title">Privacy Policy</h1>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>Your privacy is sacred to us.</p>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>1. Data We Collect</h3>
                            <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '10px' }}>
                                We only collect what is strictly necessary to provide the service:
                            </p>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: '#444' }}>
                                <li><strong>Authentication Data:</strong> Your email address and basic profile info (via Google Login) to identify your account.</li>
                                <li><strong>Chanting Data:</strong> The counts, dates, and deity names associated with your practice.</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>2. How We Use Your Data</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                Your data is used exclusively to:
                                <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                    <li>Sync your progress across your devices.</li>
                                    <li>Display your stats on the Global Leaderboard (if you choose to participate).</li>
                                    <li>Analyze aggregate app usage to improve features.</li>
                                </ul>
                            </p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>3. No Selling of Data</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                We do <strong>not</strong> sell, trade, or rent your personal identification information to others. We are a spiritual initiative, not a data broker.
                            </p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>4. Data Deletion</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
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
