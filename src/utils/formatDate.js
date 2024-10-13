import dayjs from "dayjs";

export const formatDateTime = (date) => {
    const formattedDateTime = new Date(date).toLocaleString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedDateTime;
}

export const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return formattedDate;
}

export const formatTime = (date) => {
    const formattedTime = new Date(date).toLocaleString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedTime;
}

export const formatFullDate = (date) => {
    const formattedFullDate = new Date(date).toLocaleString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return formattedFullDate.charAt(0).toUpperCase() + formattedFullDate.slice(1);
}

export const formatFullDateWithYear = (date) => {
    const formattedFullDateWithYear = new Date(date).toLocaleString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formattedFullDateWithYear.charAt(0).toUpperCase() + formattedFullDateWithYear.slice(1);
}

export const formatTimeRange = (date, duration) => {
    const startTime = new Date(date);

    const endTime = new Date(startTime.getTime() + duration * 60000);

    const formattedStartTime = startTime.toLocaleString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedEndTime = endTime.toLocaleString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${formattedStartTime} - ${formattedEndTime}`;
};

export const formatDayShort = (date) => {
    const formattedDay = new Date(date).toLocaleString('pl-PL', {
        day: 'numeric'
    });

    return formattedDay;
};

export const formatWeekDayShort = (date) => {
    dayjs.locale('pl');

    const formattedWeekDay = dayjs(date).format('ddd');

    return formattedWeekDay.charAt(0).toUpperCase() + formattedWeekDay.slice(1);
};
