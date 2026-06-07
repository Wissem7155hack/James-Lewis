import React from 'react';
import { Helmet } from 'react-helmet';

interface PersonSchemaProps {
    name?: string;
    jobTitle?: string;
    telephone?: string;
    email?: string;
}

export const PersonSchema: React.FC<PersonSchemaProps> = ({
    name = "Tenney Mountain Landscaping & Construction LLC Team",
    jobTitle = "Landscaping Specialists",
    telephone = "+1 603-481-6710",
    email = "tenney.mountain.landscaping15@gmail.com"
}) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": name,
        "jobTitle": jobTitle,
        "worksFor": {
            "@id": "https://Tenney Mountainlandscaping.com/#organization"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main St",
            "addressLocality": "New Hampshire",
            "postalCode": "03301",
            "addressRegion": "CO",
            "addressCountry": "US"
        },
        "telephone": telephone,
        "email": email,
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61579944943986"
        ],
        "knowsAbout": [
            "Landscaping",
            "Hardscaping",
            "Pavers",
            "Concrete",
            "Tree Trimming",
            "Irrigation",
            "Fencing",
            "Garden Maintenance"
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default PersonSchema;
