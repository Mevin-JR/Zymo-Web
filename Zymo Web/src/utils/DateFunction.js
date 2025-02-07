export const getCurrentTime = () => {
    const date = new Date();
    
    
    // Round minutes to nearest 30-minute mark
    let minutes = date.getMinutes();
    if (minutes < 30) {
        minutes = 30;
    } else {
        minutes = 0;
        date.setHours(date.getHours() + 1);
    }

    // Format as "YYYY-MM-DDTHH:MM" for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${formattedMinutes}`;
};
