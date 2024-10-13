export const formatPostalCode = (postalCode) => {
    const cleaned = postalCode.replace(/\D/g, '');

    if (cleaned.length === 5) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    }

    return postalCode;
};

export const unformatPostalCode = (formattedPostalCode) => {
    return formattedPostalCode.replace(/\D/g, '');
};

