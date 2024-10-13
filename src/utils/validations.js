export const validatePassword = (password) => {
    const hasNoSpaces = !/\s/.test(password);
    const isLongEnough = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (!password) {
        return 'Pole jest wymagane';
    }

    if (!hasNoSpaces) {
        return 'Hasło nie może zawierać spacji';
    }

    if (!isLongEnough) {
        return 'Hasło musi składać się z minimum 6 znaków';
    }

    if (!hasNumber) {
        return 'Hasło musi zawierać przynajmniej jedną cyfrę';
    }
    
    if (!hasLetter) {
        return 'Hasło musi zawierać co najmniej jedną literę';
    }

    return '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return 'Pole jest wymagane';
    }

    if (!emailRegex.test(email)) {
        return 'Nieprawidłowy Email';
    }

    return '';
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{9}$/;

    if (!phoneNumber) {
        return 'Pole jest wymagane';
    }

    if(!phoneRegex.test(phoneNumber)) {
        return 'Nieprawidłowy numer telefonu';
    }

    return '';
};

export const validateTextField = (text, fieldName = 'Pole') => {
    if(!text) {
        return `${fieldName} jest wymagane`;
    }

    return '';
};

export const validateNIP = (nip) => {
    const nipRegex = /^\d{10}$/;

    if (!nip) {
        return 'Pole NIP jest wymagane';
    }

    if (!nipRegex.test(nip)) {
        return 'Nieprawidłowy NIP';
    }

    return '';
};

export const validateRegon = (regon) => {
    const regonRegex = /^\d{9}$/;

    if (!regon) {
        return 'Pole Regon jest wymagane';
    }

    if (!regonRegex.test(regon)) {
        return 'Nieprawidłowy Regon';
    }

    return '';
};

export const validateKrs = (krs) => {
    const krsRegex = /^\d{10}$/;

    if (krs && !krsRegex.test(krs)) {
        return 'Nieprawidłowy KRS';
    }

    return '';
};

export const validateAddress = (address, requiredFields = []) => {
    const errors = {};

    if (requiredFields.includes('region') && (!address.region || address.region.trim() === '')) {
        errors.region = 'Pole Województwo jest wymagane';
    }

    if (requiredFields.includes('city') && (!address.city || address.city.trim() === '')) {
        errors.city = 'Pole Miasto jest wymagane';
    }

    if (requiredFields.includes('street') && (!address.street || address.street.trim() === '')) {
        errors.street = 'Pole Ulica jest wymagane';
    }

    if (requiredFields.includes('buildingNumber') && (!address.buildingNumber && address.buildingNumber.trim() === '')) {
        errors.buildingNumber = 'Pole Number Domu jest wymagane';
    } else if (address.buildingNumber && !/^\d+[a-zA-Z]*$/.test(address.buildingNumber)) {
        errors.buildingNumber = 'Nieprawidłowy numer budynku';
    }

    if (address.roomNumber && !/^\d+[a-zA-Z]*$/.test(address.roomNumber)) {
        errors.roomNumber = 'Nieprawidłowy numer lokalu';
    }

    if (requiredFields.includes('postalCode') && (!address.postalCode || !/^\d{2}-\d{3}$/.test(address.postalCode))) {
        errors.postalCode = 'Nieprawidłowy kod pocztowy';
    }

    return errors;
};

export const validateNumber = (price) => {
    return '';
}