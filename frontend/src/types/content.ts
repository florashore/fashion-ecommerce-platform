export interface LandingContent {
    hero: {
        eyebrow: string;
        titlePrimary: string;
        titleHighlight: string;
        description: string;
        backgroundImage: string;
        collageImage: string;
        collageCaption: string;
        gallery: string[];
        palette: string[];
        paletteLabels: string[];
        primaryCta: {
            label: string;
            href: string;
        };
        secondaryCta: {
            label: string;
            href: string;
        };
        stats: {
            label: string;
            value: string;
            description: string;
        }[];
    };
    marqueeLabels: string[];
    highlightCollections: {
        title: string;
        description: string;
        image: string;
        href: string;
        badge: string;
    }[];
    editorialStories: {
        title: string;
        excerpt: string;
        image: string;
        tag: string;
    }[];
    newsletter: {
        eyebrow: string;
        title: string;
        description: string;
        placeholder: string;
        ctaLabel: string;
    };
}

