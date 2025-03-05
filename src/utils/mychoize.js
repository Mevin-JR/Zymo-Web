import { toPascalCase } from "./helperFunctions";

const getTotalKms = (tripDurationHours) => {
    return {
        FF: `${(120 / 24) * tripDurationHours} KMs`, // Fixed Fare - 120 KM/Day
        MP: `${(300 / 24) * tripDurationHours} KMs`, // Monthly Plan - 300 KM/Day
        DR: "Unlimited KMs", // Daily Rental - Unlimited KM
    };
};

const findPackage = (rateBasis) => {
    if (rateBasis === "FF") {
        return "120km/day";
    } else if (rateBasis === "MP") {
        return "300km/day";
    } else if (rateBasis === "DR") {
        return "Unlimited Kms";
    } else {
        return "Undefined";
    }
};

const fetchSubscriptionCars = async (CityName, formattedPickDate, formattedDropDate) => {
    let apiUrl = import.meta.env.VITE_FUNCTIONS_API_URL;

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

        // Filter cars where RateBasis is "MLK"
        const subscriptionCars = mychoizeData.SearchBookingModel
            .filter((car) => car.RateBasis === "MLK" && car.BrandName)
            .map((car) => ({
                id: car.TariffKey,
                brand: toPascalCase(car.BrandName.split(" ")[0]),
                name: toPascalCase(car.BrandName.split(" ")[1]),
                options: [car.TransMissionType, car.FuelType, `${car.SeatingCapacity} Seats`],
                address: car.LocationName,
                locationkey: car.LocationKey,
                hourly_amount: car.PerUnitCharges,
                images: [car.VehicleBrandImageName],
                ratingData: { text: "No ratings available" },
                extrakm_charge: `₹${car.ExKMRate}/km`,
                trips: car.TotalBookinCount,
                source: "mychoize",
                sourceImg: "/images/ServiceProvider/mychoize.png",
                fare: `₹${car.TotalExpCharge}`, // Directly assign fare
                rateBasis: car.rateBasis,
            }));

        return subscriptionCars;
    } catch (error) {
        console.error("MyChoize API failed:", error);
        return [];
    }
};

const fetchMyChoizeCars = async (
    CityName,
    formattedPickDate,
    formattedDropDate,
    tripDurationHours
) => {
    let apiUrl = import.meta.env.VITE_FUNCTIONS_API_URL;
    

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
                    brand: toPascalCase(car.BrandName.split(" ")[0]),
                    name: toPascalCase(car.BrandName.split(" ")[1]),
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
                    extrakm_charge: `₹${car.ExKMRate}/km`,
                    trips: car.TotalBookinCount,
                    source: "mychoize",
                    sourceImg: "/images/ServiceProvider/mychoize.png",
                    rateBasisFare: {},
                    all_fares: [],

                    brandGroundLength: car.BrandGroundLength,
            brandKey: car.BrandKey,
            brandLength: car.BrandLength,
            fuelType: car.FuelType,
            groupKey: car.GroupKey,
            locationKey: car.LocationKey,
            luggageCapacity: car.LuggageCapacity,
            rftEngineCapacity: car.RFTEngineCapacity,
            seatingCapacity: car.SeatingCapacity,
            tariffKey: car.TariffKey,
            transmissionType: car.TransmissionType,
            vtrHybridFlag: car.VTRHybridFlag,
            vtrSUVFlag: car.VTRSUVFlag,
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

 let apiUrl = "http://127.0.0.1:5001/zymo-prod/us-central1/api";
const createBooking = async (bookingDetails) => {
    try {
        const response = await fetch(`${apiUrl}/mychoize/create-booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingDetails),
        });

        if (!response.ok) {
            throw new Error("Failed to create booking");
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        console.error("Error creating booking:", error);
        return { error: error.message };
    }
};

const fetchLocations = async (City, pickupDateTime, dropoffDateTime) => {
    try {
      const response = await fetch(`${apiUrl}/mychoize/get-location-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          City,
          PickupDateTime: pickupDateTime,
          DropoffDateTime: dropoffDateTime, 

        }),
      });
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  

export { findPackage, fetchMyChoizeCars , fetchSubscriptionCars, createBooking,fetchLocations};
