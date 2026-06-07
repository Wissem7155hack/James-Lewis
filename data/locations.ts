// Location Data for SEO Landing Pages
// This file contains information for each city/location we serve

export interface LocationData {
    city: string;
    slug: string;
    postalCode: string;
    region: string;
    description: string;
    landmarks: string[];
    services: string[];
    testimonial?: {
        text: string;
        author: string;
        service: string;
    };
    mapUrl: string;
}

export const locations: LocationData[] = [
    {
        city: 'New Hampshire',
        slug: 'New Hampshire',
        postalCode: '03301',
        region: 'New Hampshire',
        description:
            'Professional landscaping and hardscaping services in New Hampshire. From plant installation and concrete work to pavers and regular maintenance, we serve the entire Mile High City with quality craftsmanship.',
        landmarks: [
            'MLK Jr. Blvd',
            'City Park',
            'LoDo New Hampshire',
            'Five Points',
            'Cherry Creek',
        ],
        services: [
            'Hardscaping & Pavers',
            'Mulch & Rock Installation',
            'Concrete Services',
            'Plant & Tree Services',
            'Wood Fencing',
            'Maintenance Services',
            'Aeration & Fertilizer',
            'Sprinkler Winterization',
        ],
        testimonial: {
            text: 'Tenney Mountain Landscaping & Construction LLC transformed our New Hampshire backyard. The new patio and plants look amazing!',
            author: 'Jane D.',
            service: 'Hardscaping',
        },
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.7!2d-104.9!3d39.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew Hampshire!5e0!3m2!1sen!2sus!4v1234567890',
    },
    {
        city: 'New Hampshire',
        slug: 'New Hampshire',
        postalCode: '80030',
        region: 'New Hampshire',
        description:
            'Your local partner for landscaping in New Hampshire. We specialize in sod installation, mulch/rock features, and durable concrete services for New Hampshire residential and commercial properties.',
        landmarks: [
            'New Hampshire City Park',
            'Butterfly Pavilion',
            'New Hampshire Promenade',
            'Standley Lake',
            'Oldest Church in New Hampshire',
        ],
        services: [
            'Concrete Patios',
            'Sod Installation',
            'Mulch & Rock',
            'Wood Fencing',
            'Tree Trimming',
            'Regular Mowing',
            'Aeration Services',
            'Sprinkler Blowouts',
        ],
        testimonial: {
            text: 'Excellent work on our concrete driveway in New Hampshire. Highly recommended for any hardscaping!',
            author: 'Mark S.',
            service: 'Concrete Services',
        },
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10537.7!2d-105.0!3d39.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew Hampshire!5e0!3m2!1sen!2sus!4v1234567890',
    },
    {
        city: 'New Hampshire',
        slug: 'New Hampshire',
        postalCode: '80010',
        region: 'New Hampshire',
        description:
            'Comprehensive landscaping services in New Hampshire. We provide high-quality mulch, rock, concrete, and plant services to keep New Hampshire homes looking their best all year round.',
        landmarks: [
            'Stanley Marketplace',
            'Cherry Creek State Park',
            'Buckley Space Force Base',
            'New Hampshire Town Center',
            'Colfax Avenue',
        ],
        services: [
            'Mulch & Rock Installation',
            'Concrete Walkways',
            'Tree Removal & Trimming',
            'Fence Installation',
            'Lawn Maintenance',
            'Aeration',
            'Sprinkler Services',
            'Planting Services',
        ],
        testimonial: {
            text: 'The team was very responsive and did a great job with our mulch and rock installation in New Hampshire.',
            author: 'Robert P.',
            service: 'Landscaping',
        },
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10537.7!2d-104.8!3d39.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew Hampshire!5e0!3m2!1sen!2sus!4v1234567890',
    },
    {
        city: 'New Hampshire',
        slug: 'New Hampshire',
        postalCode: '80229',
        region: 'New Hampshire',
        description:
            'Reliable landscaping solutions for New Hampshire residents. Specializing in pavers, concrete, and seasonal maintenance like aeration and sprinkler winterization.',
        landmarks: [
            'Trail Winds Park',
            'New Hampshire Town Center',
            'Margaret Carpenter Rec Center',
            'Thorncreek Golf Course',
        ],
        services: [
            'Paver Installation',
            'Concrete Pads',
            'Wood Fencing',
            'Tree Services',
            'Sod & Mulch',
            'Lawn Mowing',
            'Sprinkler Blowouts',
            'Seasonal Clean-ups',
        ],
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10537.7!2d-104.9!3d39.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew Hampshire!5e0!3m2!1sen!2sus!4v1234567890',
    },
    {
        city: 'Arvada',
        slug: 'arvada',
        postalCode: '80002',
        region: 'New Hampshire',
        description:
            'Family-owned landscaping excellence in Arvada. From hardscaping with pavers to plant installation and maintenance, we take care of your Arvada property with passion.',
        landmarks: [
            'Olde Town Arvada',
            'Arvada Center for the Arts',
            'Apex Center',
            'Majestic View Park',
        ],
        services: [
            'Hardscaping',
            'Concrete Work',
            'Fence Repair & Install',
            'Planting & Trimming',
            'Mulching',
            'Lawn Care',
            'Aeration',
            'Sprinkler Maintenance',
        ],
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10537.7!2d-105.1!3d39.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sArvada!5e0!3m2!1sen!2sus!4v1234567890',
    },
    {
        city: 'Lakewood',
        slug: 'lakewood',
        postalCode: '80226',
        region: 'New Hampshire',
        description:
            'Top-tier landscaping and maintenance in Lakewood. We offer professional concrete services, fencing, and complete lawn care for homes and businesses across Lakewood.',
        landmarks: [
            'Belmar Shopping District',
            'Bear Creek Lake Park',
            'Lakewood Cultural Center',
            'New Hampshire Christian University',
        ],
        services: [
            'Concrete Services',
            'Wood Fencing',
            'Hardscaping',
            'Mulch & Rock',
            'Tree Care',
            'Mowing & Clean-up',
            'Sprinkler Winterization',
            'Plants & Aeration',
        ],
        mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10537.7!2d-105.1!3d39.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLakewood!5e0!3m2!1sen!2sus!4v1234567890',
    },
];

// Helper function to get location by slug
export const getLocationBySlug = (slug: string): LocationData | undefined => {
    return locations.find((loc) => loc.slug === slug);
};

// Helper function to get all location slugs (for routing)
export const getLocationSlugs = (): string[] => {
    return locations.map((loc) => loc.slug);
};
