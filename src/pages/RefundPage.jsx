import React from 'react';
import SEO from '@/components/common/SEO';

const RefundPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <SEO
                        title="Refund Policy | Naam Jaao Counter"
                        description="Japa Counter is a free service. Read our policy regarding future premium features."
                    />
                    <h1 className="guru-main-title">Refund Policy</h1>

                    <div
                        className="guru-card static-page-card center-content animate-slide-up"
                    >
                        <span className="refund-emoji">🙏</span>
                        <h2 className="static-page-section-title">Japa Counter is Free</h2>
                        <p className="static-page-text mb-30">
                            Currently, Japa Counter is a completely free service tailored for the spiritual community. There are no subscriptions, premium locks, or hidden fees.
                        </p>

                        <div className="refund-info-box">
                            <h3 className="refund-info-title">Future Premium Features</h3>
                            <p className="static-page-text refund-footer-text">
                                If we introduce premium features or donation-based support in the future, we will offer a specific refund window (typically 14 days) for any payments made in error.
                            </p>
                        </div>

                        <p className="static-page-text">
                            If you believe you have been charged incorrectly by a third-party service claiming to be us, please contact us immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPage;
