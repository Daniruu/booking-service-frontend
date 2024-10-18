import { handleError } from "./errorHandler";

export const sendRequest = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        method: options.method || 'GET',
        headers: {
            ...options.headers
        },
        body: options.body ? options.body : undefined
    });

    if (!response.ok) {
        await handleError(response);
    }

    return response.json();
};

export const sendRequestWithToken = async (url, options = {}, refreshAccessToken) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('Użytkownik nie autoryzowany');
    }

    const fetchWithToken = async (token) => {
        const response = await fetch(url, {
            ...options,
            method: options.method || 'GET',
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' })
            },
            body: options.body ? options.body : undefined
        });

        if (!response.ok) {
            throw response;
        }

        return response.json();
    };

    try {
        const json = await fetchWithToken(accessToken);
        return json;
    } catch (error) {
        if (error.status === 401) {
            console.log('Token expired, refreshing token...');
            const newToken = await refreshAccessToken();

            if (newToken) {
                const json = await fetchWithToken(newToken);
                return json;
            } else {
                throw new Error('Nie udało się odświeżyć tokena');
            }
        }
        
        await handleError(error);
    }
};