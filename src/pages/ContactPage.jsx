import React from 'react';
import SEO from '../components/common/SEO';

const ContactPage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <SEO
                        title="Contact Us | Naam Jaap Counter"
                        description="Get in touch with the Japa Counter team for feedback, feature requests, or support."
                    />
                    <h1 className="guru-main-title">Contact Us</h1>

                    <div
                        className="guru-card static-page-card center-content contact-card-width animate-slide-up"
                    >
                        <div className="contact-emoji">📬</div>

                        <h2 className="static-page-section-title">
                            We'd Love to Hear From You
                        </h2>

                        <p className="static-page-text mb-40">
                            Whether you have a feature request, found a bug, or just want to share your spiritual journey with us, we are always listening.
                        </p>

                        <div className="contact-email-box">
                            <p className="contact-email-label">
                                EMAIL US AT
                            </p>
                            <p className="contact-email-address">
                                hello@japacounter.com
                            </p>
                        </div>

                        <p className="static-page-text small-mute mt-30">
                            We usually respond within 24-48 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
