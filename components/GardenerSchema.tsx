import React from 'react';
import { Helmet } from 'react-helmet';

export const GardenerSchema: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Gardener",
        "@id": "https://Tenney Mountainlandscaping.com/#gardener",
        "name": "Tenney Mountain Landscaping & Construction LLC",
        "description": "Professional landscaping services specialized in pavers, concrete, mulch, and plant installation in New Hampshire, New Hampshire, and New Hampshire",
        "founder": {
            "@type": "Person",
            "name": "Tenney Mountain Landscaping & Construction LLC Team"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "New Hampshire"
            },
            {
                "@type": "City",
                "name": "New Hampshire"
            },
            {
                "@type": "City",
                "name": "New Hampshire"
            },
            {
                "@type": "City",
                "name": "New Hampshire"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Landscaping & Concrete Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Hardscaping & Pavers",
                        "description": "Professional installation of pavers and hardscaping for outdoor living spaces",
                        "provider": {
                            "@id": "https://Tenney Mountainlandscaping.com/#organization"
                        },
                        "category": "Hardscaping"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Concrete Installation",
                        "description": "Durable concrete for patios, walkways, and driveways",
                        "provider": {
                            "@id": "https://Tenney Mountainlandscaping.com/#organization"
                        },
                        "category": "Concrete"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Garden Maintenance",
                        "description": "Mowing, trimming, weeding, and seasonal clean-ups",
                        "category": "Maintenance"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tree & Plant Services",
                        "description": "Installation, trimming, and removal of trees and shrubs",
                        "category": "Landscaping"
                    }
                }
            ]
        },
        "url": "https://Tenney Mountainlandscaping.com/",
        "telephone": "+1 603-481-6710",
        "email": "tenney.mountain.landscaping15@gmail.com",
        "priceRange": "$$",
        "paymentAccepted": "Cash, Check, Digital Payment",
        "currenciesAccepted": "USD"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default GardenerSchema;
