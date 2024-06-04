import { useState, useCallback } from 'react';

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [sentiment, setSentiment] = useState<number>(0);
    const [error, setError] = useState<any>(null);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingUrl, setLoadingUrl] = useState<boolean>(false);

    const fetchData = useCallback(async (query: string, num_results: number = 10) => {
        setLoadingData(true);
        try {
            const response = await fetch(`${url}?query=${query}&num_results=${num_results}`);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoadingData(false);
        }
    }, [url]);

    const fetchUrl = useCallback(async (extracted_url: string) => {
        setLoadingUrl(true);
        try {
            const encodedUrl = encodeURIComponent(extracted_url);
            const response = await fetch(`${url}?url=${encodedUrl}`);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }
            const data = await response.json();
            setSentiment(data);
            console.log('data hook: ', data)
        } catch (error) {
            setError(error);
        } finally {
            setLoadingUrl(false);
        }
    }, [url]);

    return { data, error, loadingData, loadingUrl, fetchData, fetchUrl, sentiment };
};
