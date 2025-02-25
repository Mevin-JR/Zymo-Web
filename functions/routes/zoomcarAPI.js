const express = require("express");
const axios = require("axios");

const router = express.Router();

// Zoom credentials
let prod = true;
const zoomApiKey = prod
    ? process.env.ZOOMCAR_PROD_API_KEY
    : process.env.ZOOMCAR_TEST_API_KEY;
const zoomApiUrl = prod
    ? process.env.ZOOMCAR_PROD_API_URL
    : process.env.ZOOMCAR_TEST_API_URL;
const apiVer = "v2/";
const zoomId = prod ? process.env.ZOOMCAR_PROD_ID : process.env.ZOOMCAR_TEST_ID;
const zoomPass = prod
    ? process.env.ZOOMCAR_PROD_PASS
    : process.env.ZOOMCAR_TEST_PASS;

// Token Generators
async function getZoomToken() {
    try {
        const zoomTokenUrl = `${zoomApiUrl}authenticate/token`;
        const basicAuth = `Basic ${Buffer.from(
            `${zoomId}:${zoomPass}`
        ).toString("base64")}`;

        const body = {
            grant_type: "client_credentials",
        };
        const header = {
            authorization: basicAuth,
            "Content-Type": "application/json",
        };

        const response = await axios.post(zoomTokenUrl, body, {
            headers: header,
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Zoom token error:", error.data);
    }
}

async function getUserToken(token, uid) {
    try {
        const authURL = `${zoomApiUrl}${apiVer}users/auth`;
        const header = {
            "Content-Type": "application/json",
            "x-api-key": zoomApiKey,
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
        };

        const body = {
            user_hash_id: uid,
        };
        const response = await axios.post(authURL, body, { headers: header });
        return response.data.user_token;
    } catch (error) {
        console.error("User token error:", error.response.data);
    }
}

// Constants
const noUserTokenHeader = async () => {
    const token = await getZoomToken();
    return {
        "Content-Type": "application/json",
        "x-api-key": zoomApiKey,
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        platform: "web",
    };
};

const userTokenHeader = async (uid) => {
    const token = await getZoomToken();
    const userToken = await getUserToken(token, uid);
    return {
        "Content-Type": "application/json",
        "x-api-key": zoomApiKey,
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "USER-TOKEN": userToken,
        platform: "web",
    };
};

router.post("/search", async (req, res) => {
    try {
        const params = `lat=${req.body.data.lat}&lng=${req.body.data.lng}&city=${req.body.data.city}&country_code=IND&starts_epoch=${req.body.data.fromDate}&ends_epoch=${req.body.data.toDate}&type=normal`;
        const searchURL = `${zoomApiUrl}${apiVer}search?${params}`;
        const header = await noUserTokenHeader();
        const response = await axios.get(searchURL, { headers: header });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

router.post("/bookings/create-booking", async (req, res) => {
    try {
        const body = req.body;
        const createBookingURL = `${zoomApiUrl}${apiVer}bookings?city=${body.booking_params.city}`;
        const header = await userTokenHeader(body.customer.uid);
        console.log(createBookingURL, header, body);
        const response = await axios.post(createBookingURL, body, {
            headers: header,
        });

        res.json(response.data);
    } catch (error) {
        console.log(error.response.data);
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

router.post("/bookings/details", async (req, res) => {
    try {
        const bookingDetailsURL = `${zoomApiUrl}${apiVer}bookings/${req.body.data.booking_id}`;
        const header = await userTokenHeader();
        const response = await axios.get(bookingDetailsURL, {
            headers: header,
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

router.post("/payments", async (req, res) => {
    try {
        const paymentsURL = `${zoomApiUrl}${apiVer}payments?city=${req.body.data.city}&platform=web`;
        const header = await userTokenHeader();
        const response = await axios.post(
            paymentsURL,
            req.body.data.bookingData,
            {
                headers: header,
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

router.post("/zoomcar/payments-update", async (req, res) => {
    try {
        const paymentsUpdateURL = `${zoomApiUrl}${apiVer}payments/${req.body.data.payment_id}?city=${req.body.data.city}`;
        const header = await userTokenHeader();
        const response = await axios.put(
            paymentsUpdateURL,
            req.body.data.booking_details,
            {
                headers: header,
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

router.post("/bookings/cancel-booking", async (req, res) => {
    try {
        const cancelBookingURL = `${zoomApiUrl}${apiVer}bookings/cancel/initiate?booking_id=${req.body.data.booking_id}&city=${req.body.data.city}`;
        const header = await userTokenHeader();
        const response = await axios.post(cancelBookingURL, {
            headers: header,
        });

        res.json(response.data);
    } catch (error) {
        console.log(error.response.data);
        res.status(error.response?.status || 500).json({
            error: error.response.data,
        });
    }
});

module.exports = router;
