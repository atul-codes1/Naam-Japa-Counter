import React from 'react';
import { Link } from 'react-router-dom';

const WebFooter = ({ isDesktop }) => {
    const links = ['About', 'Terms', 'Privacy', 'Refund', 'Contact'];

    return (
        <div className="footer">
            {isDesktop ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <FooterLinks links={links} />
                    <div className="footer-copyright">© 2026 Radha Naam Jap Counter</div>
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <FooterLinks links={links} />
                    <div style={{ height: '15px' }} />
                    <div className="footer-copyright" style={{ fontSize: '11px' }}>
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
