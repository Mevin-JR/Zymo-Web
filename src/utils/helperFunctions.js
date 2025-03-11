// Date Formatting
const formatDate = (date) => {
    return new Date(date)
        .toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(" at", "");
};

const formatDateForMyChoize = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return null; // Handle invalid date input
    return `\/Date(${date.getTime()}+0530)\/`;
};

// 24hr to 12hr format
const formatTo12 = (time) => {
    let [hour, minutes] = time.split(":").map(Number);
    let period = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}${period}`;
};

// String Formatting
const toPascalCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// Format fare/prices
const formatFare = (fare) => {
    if (!fare) {
        console.error("Could not format fare:", fare);
        return;
    }

    if (fare[0] === "₹") {
        fare = fare.slice(1);
    }

    const formatter = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return `₹${formatter.format(fare)}`;
};

export { formatDate, toPascalCase, formatFare, formatTo12 ,formatDateForMyChoize};
