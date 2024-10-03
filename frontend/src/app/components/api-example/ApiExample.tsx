'use client';

import { useState, useEffect } from 'react';
import { apiGet } from '@/lib/api';
import { API_BASE_URL } from '@/config/api';

/**
 * Example component showing how to use the API utilities
 */
export default function ApiExample() {
    const [apiInfo, setApiInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await apiGet('/test');
                setApiInfo(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                console.error('Error fetching API data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">API Connection Status</h2>

            <div className="mb-4">
                <p className="text-sm text-gray-600">Backend URL:</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">
                    {API_BASE_URL}
                </p>
            </div>

            {loading && (
                <div className="text-blue-600">
                    <p>Loading...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {!loading && !error && apiInfo && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    <p className="font-bold">✓ Connected Successfully</p>
                    <p className="text-sm mt-2">Response: {JSON.stringify(apiInfo)}</p>
                </div>
            )}
        </div>
    );
}

