/**
 * API Configuration
 * Contains the base URL for all API requests
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://160.187.141.62:5000';

export const API_ENDPOINTS = {
    users: '/api/users',
    items: '/api/items',
    posts: '/api/posts',
    // Add more endpoints as needed
};

