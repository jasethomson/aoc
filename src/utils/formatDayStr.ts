const formatDayStr = (day: string): string => {
    if (day.length === 1) {
        day = '0' + day;
    }

    return day;
}

export default formatDayStr;