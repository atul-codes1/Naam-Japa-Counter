import React from 'react';

const ContactPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title">Contact Us</h1>

                    <div className="guru-card" style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📬</div>

                        <h2 style={{ fontSize: '24px', color: '#880E4F', marginBottom: '20px' }}>
                            We'd Love to Hear From You
                        </h2>

                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '40px' }}>
                            Whether you have a feature request, found a bug, or just want to share your spiritual journey with us, we are always listening.
                        </p>

                        <div style={{ background: '#F8BBD0', padding: '20px', borderRadius: '12px', display: 'inline-block' }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#880E4F', fontWeight: 'bold' }}>
                                EMAIL US AT
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '20px', color: '#D81B60', fontWeight: '600' }}>
                                hello@japacounter.com
                            </p>
                        </div>

                        <p style={{ marginTop: '30px', fontSize: '14px', color: '#888' }}>
                            We usually respond within 24-48 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
