export const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');

    const hasPrefix = cleaned.startsWith('48');
    const localNumber = hasPrefix ? cleaned.slice(2) : cleaned;
    
    const match = localNumber.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
    
    if (match) {
        return `+48 ${match[1]}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
    }
    
    return number;
};

export const unformatPhoneNumber = (formattedNumber) => {
    const cleaned = formattedNumber.replace(/\D/g, '');

    if (cleaned.startsWith('48')) {
        return cleaned.slice(2);
    }

    return cleaned;
};

