import React from 'react';
import { Helmet } from 'react-helmet-async';
import { globalKeywords } from '../../data/seoContent';

const SEO = ({
    title,
    description,
    keywords = [],
    image = "/og-image.png",
    url,
    type = "website"
}) => {
    const siteTitle = "Japa Counter";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const allKeywords = [...new Set([...keywords, ...globalKeywords])].join(", ");
    const currentUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={allKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
