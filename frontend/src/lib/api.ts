/**
 * API utility functions for making requests to the backend
 */

import { API_BASE_URL } from '@/config/api';

export interface ApiError {
    message: string;
    status: number;
}

/**
 * Make a GET request to the API
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw {
                message: `API request failed: ${response.statusText}`,
                status: response.status,
            } as ApiError;
        }

        return await response.json();
    } catch (error) {
        console.error('API GET Error:', error);
        throw error;
    }
}

/**
 * Make a POST request to the API
 */
export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw {
                message: `API request failed: ${response.statusText}`,
                status: response.status,
            } as ApiError;
        }

        return await response.json();
    } catch (error) {
        console.error('API POST Error:', error);
        throw error;
    }
}

/**
 * Make a PUT request to the API
 */
export async function apiPut<T>(endpoint: string, data: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw {
                message: `API request failed: ${response.statusText}`,
                status: response.status,
            } as ApiError;
        }

        return await response.json();
    } catch (error) {
        console.error('API PUT Error:', error);
        throw error;
    }
}

/**
 * Make a DELETE request to the API
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw {
                message: `API request failed: ${response.statusText}`,
                status: response.status,
            } as ApiError;
        }

        return await response.json();
    } catch (error) {
        console.error('API DELETE Error:', error);
        throw error;
    }
}

