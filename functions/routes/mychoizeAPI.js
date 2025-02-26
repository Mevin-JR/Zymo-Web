const express = require("express");
const axios = require("axios");

const router = express.Router();

// MyChoize API Configuration
const myChoizeUrl = process.env.MYCHOIZE_URL;
const myChoizeUserName = process.env.MYCHOIZE_USERNAME;
const myChoizeKey = process.env.MYCHOIZE_KEY;

const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
        `${myChoizeUserName}:${myChoizeKey}`
    ).toString("base64")}`,
};

async function fetchData(endpoint) {
    try {
        const url = `${myChoizeUrl}${endpoint}`;
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return { error: `Failed to fetch ${endpoint}` };
    }
}

router.get("/cities", async (req, res) => {
    const data = await fetchData("ListingService/GetCityList");
    res.json(data);
});

async function getCityKeyFromName(cityName) {
    try {
        const cityData = await fetchData("ListingService/GetCityList");
        if (cityData.ErrorFlag === "Y" || !cityData.CityList) {
            throw new Error(
                cityData.ErrorMessage || "Failed to fetch city list"
            );
        }

        if (cityName.toLowerCase() === "bangalore") {
            cityName = "bengaluru";
        }

        const selectedCity = cityData.CityList.find(
            (city) =>
                city.CityDescription.toLowerCase() === cityName.toLowerCase()
        );
        if (!selectedCity) {
            throw new Error("City not found");
        }
        return selectedCity.CityKey;
    } catch (error) {
        console.error("Error fetching city key:", error);
        return null;
    }
}

// Format date to MyChoize format
async function formatDateToMyChoize(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) throw new Error("Invalid date format");
    return `\/Date(${date.getTime()}+0530)\/`;
}

// Search cars endpoint
router.post("/search-cars", async (req, res) => {
    try {
        let { PickDate, DropDate, CityName } = req.body.data;

        if (!PickDate || !DropDate || !CityName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Get CityKey from CityName
        const CityKey = await getCityKeyFromName(CityName);
        if (!CityKey) {
            return res.status(404).json({ error: "City not found" });
        }

        const requestBody = {
            PickDate,
            DropDate,
            CityKey: parseInt(CityKey, 10),
            RentalType: "D",
            LocationKey: 0, // Default location key
            PageNo: 1,
            PageSize: 50,
            FuelType: "",
            GearType: "",
            SecurityToken: "",
            VehcileType: "",
        };

        const response = await axios.post(
            `${myChoizeUrl}BookingService/SearchBookingNewList`,
            requestBody,
            { headers }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error searching cars:", error);
        res.status(500).json({ error: error.message });
    }
});

// Create Booking API
router.post("/create-booking", async (req, res) => {
    try {
        const { DropDate, PickDate, PickRegionKey, ...rest} = req.body;
        if (!DropDate || !PickDate || !PickRegionKey ) {
            return res.status(400).json({ error: "Missing required fields: DropDate, PickDate, PickRegionKey" });
        }

        const bookingData = {
            DropDate,
            PickDate,
            PickRegionKey,
            ...rest,
        };
        console.log("Booking Data:", bookingData);
        const response = await axios.post(`${myChoizeUrl}BookingService/CreateBooking`, bookingData, { headers });
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Error creating booking:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            config: error.config,
        });
        return res.status(500).json({ error: "Failed to create booking", details: error.response?.data || error.message });
    }
});

module.exports = router;
