import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords, canonical }) => {
    const defaultTitle = 'James Lewis Interiors — Craftsmanship You Can Trust';
    const defaultDescription = 'Commercial and residential interior fit-out, suspended ceilings, partitions, and renovation work.';

    return (
        <Helmet>
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords ? <meta name="keywords" content={keywords} /> : null}
            {canonical ? <link rel="canonical" href={canonical} /> : null}
            <meta name="robots" content="index,follow" />
        </Helmet>
    );
};

export default SEOHead;
