import { LandingContent } from '@/types/content';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://160.187.141.62:5000';

export const contentService = {
    async getLandingContent(): Promise<LandingContent | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/content/landing`, {
                next: { revalidate: 60 },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch landing content: ${response.statusText}`);
            }

            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Error fetching landing content:', error);
            return null;
        }
    },
};

