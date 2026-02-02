import React from 'react';

const TermsPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title">Terms of Service</h1>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>Last Updated: March 2026</p>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>1. Spiritual Nature of the App</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                Japa Counter is a spiritual tool designed to assist in your personal devotional practice (Sadhana). It is provided "as is" to help track mantra chanting. We make no claims regarding spiritual attainments or worldly benefits resulting from the use of this app.
                            </p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>2. User Conduct</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                We expect all users to maintain a respectful demeanor within the community features (Leaderboard). Any usernames or profile pictures deemed offensive or inappropriate for a spiritual community will be removed without notice.
                            </p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>3. Data Integrity</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                While we strive to keep your chant counts accurate and synced across devices, we are not liable for any data loss due to technical failures, network issues, or acts of God. We encourage you to sync your data regularly by logging in.
                            </p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#880E4F', marginBottom: '10px' }}>4. Modifications</h3>
                            <p style={{ lineHeight: '1.6', color: '#444' }}>
                                We reserve the right to modify or discontinue any part of the service at any time. We will always try to provide notice for significant changes that affect your data.
                            </p>
                        </section>

                        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                            By using Japa Counter, you agree to these terms. May your chanting bring you peace.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
