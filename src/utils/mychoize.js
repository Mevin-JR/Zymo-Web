const getTotalKms = (tripDurationHours) => {
    return {
        FF: `${(120 / 24) * tripDurationHours} KMs`, // Fixed Fare - 120 KM/Day
        MP: `${(300 / 24) * tripDurationHours} KMs`, // Monthly Plan - 300 KM/Day
        DR: "Unlimited", // Daily Rental - Unlimited KM
    };
};

const toPascalCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export const fetchMyChoizeCars = async (
    CityName,
    formattedPickDate,
    formattedDropDate,
    tripDurationHours
) => {
    // const apiUrl = import.meta.env.VITE_FUNCTIONS_API_URL;
    const apiUrl = "http://127.0.0.1:5001/zymo-prod/us-central1/api";

    try {
        const response = await fetch(`${apiUrl}/mychoize/search-cars`, {
            method: "POST",
            body: JSON.stringify({
                data: {
                    CityName,
                    PickDate: formattedPickDate,
                    DropDate: formattedDropDate,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("MyChoize API error");

        const mychoizeData = await response.json();

        if (!mychoizeData.SearchBookingModel) {
            console.error("MyChoize API response missing expected data.");
            return [];
        }

        const groupedCars = {};
        mychoizeData.SearchBookingModel.filter(
            (car) => car.RateBasis !== "MLK" && car.BrandName
        ).forEach((car) => {
            const key = car.GroupKey;

            if (!groupedCars[key]) {
                groupedCars[key] = {
                    id: car.TariffKey,
                    brand: toPascalCase(car.BrandName),
                    name: "",
                    options: [
                        car.TransMissionType,
                        car.FuelType,
                        `${car.SeatingCapacity} Seats`,
                    ],
                    address: car.LocationName,
                    location_id: car.LocationKey,
                    hourly_amount: car.PerUnitCharges,
                    images: [car.VehicleBrandImageName],
                    ratingData: { text: "No ratings available" },
                    total_km: getTotalKms(tripDurationHours),
                    extrakm_charge: `Extra kms will be charged at ₹${car.ExKMRate}/km`,
                    trips: car.TotalBookinCount,
                    source: "mychoize",
                    rateBasisFare: {},
                    all_fares: [],
                };
            }

            // Assign fares to corresponding rate basis
            groupedCars[key].rateBasisFare[car.RateBasis] = car.TotalExpCharge;

            Object.values(groupedCars[key].rateBasisFare).forEach((fare) => {
                if (!groupedCars[key].all_fares.includes(fare)) {
                    groupedCars[key].all_fares.push(fare);
                }
            });
        });

        return Object.values(groupedCars).map((car) => ({
            ...car,
            fare: `₹${Math.min(...car.all_fares)}`,
        }));
    } catch (error) {
        console.error("MyChoize API failed:", error);
        return [];
    }
};
