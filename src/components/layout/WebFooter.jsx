import React from 'react';
import { Link } from 'react-router-dom';

const WebFooter = ({ isDesktop }) => {
    const links = ['About', 'Terms', 'Privacy', 'Refund', 'Contact'];

    return (
        <div className="footer">
            {isDesktop ? (
                <div className="footer-desktop-container">
                    <FooterLinks links={links} />
                    <div className="footer-copyright">© 2026 Radha Naam Jap Counter</div>
                </div>
            ) : (
                <div className="footer-mobile-container">
                    <FooterLinks links={links} />
                    <div className="footer-mobile-spacer" />
                    <div className="footer-copyright mobile-small">
                        © 2026 Radha Naam Jap Counter
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebFooter;

const FooterLinks = ({ links }) => {
    // Map link text to route paths
    const getPath = (text) => {
        return `/${text.toLowerCase()}`;
    };

    return (
        <div className="footer-links">
            {links.map((link, i) => (
                <Link key={i} to={getPath(link)} className="footer-link">
                    {link}
                </Link>
            ))}
        </div>
    );
};
