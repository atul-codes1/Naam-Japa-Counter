import React from 'react';

const RefundPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title">Refund Policy</h1>

                    <div className="guru-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🙏</span>
                        <h2 style={{ fontSize: '24px', color: '#880E4F', marginBottom: '20px' }}>Japa Counter is Free</h2>
                        <p style={{ lineHeight: '1.8', color: '#444', fontSize: '16px', marginBottom: '30px' }}>
                            Currently, Japa Counter is a completely free service tailored for the spiritual community. There are no subscriptions, premium locks, or hidden fees.
                        </p>

                        <div style={{ background: '#FFF3E0', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', color: '#E65100', marginBottom: '10px' }}>Future Premium Features</h3>
                            <p style={{ lineHeight: '1.6', color: '#5D4037' }}>
                                If we introduce premium features or donation-based support in the future, we will offer a specific refund window (typically 14 days) for any payments made in error.
                            </p>
                        </div>

                        <p style={{ lineHeight: '1.6', color: '#666' }}>
                            If you believe you have been charged incorrectly by a third-party service claiming to be us, please contact us immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPage;
