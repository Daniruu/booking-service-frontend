export const handleError = async (error) => {
    if (error instanceof Response) {
        const json = await error.json();
        switch (error.status) {
            case 400:
                if(json.errors) {
                    const errors = Object.values(json.errors).flat().join(', ');
                    throw new Error(errors || 'Bąd walidacji');
                } else if (json.message) {
                    throw new Error(json.message);
                } else {
                    throw new Error('Wystąpił bład');
                }
            case 401:
                if(json.message) {
                    throw new Error(json.message);
                } else {
                    throw new Error('Wystąpił bład');
                }
            case 500:
                throw new Error(json.message + json.details);
            default:
                throw new Error('Nieznany bład. Spróbuj ponownie')
        }
    } else if (error instanceof Error) {
        console.error(error.message);
        throw error;
    } else {
        throw new Error('Wystąpił nieznany błąd');
    }
};