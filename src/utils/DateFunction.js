export const getCurrentTime = () => {
    const date = new Date();

    // Add 2 hours to the current time
    date.setHours(date.getHours() + 2);

    // Round to the nearest 0 or 30 minutes
    const minutes = date.getMinutes();
    if (minutes < 15) {
        date.setMinutes(0);
    } else if (minutes >= 15 && minutes < 45) {
        date.setMinutes(30);
    } else {
        date.setMinutes(0);
        date.setHours(date.getHours() + 1); // Round up to the next hour
    }

    // Format as "YYYY-MM-DDTHH:MM" for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutesFormatted = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutesFormatted}`;
};