const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const zoomcarRoutes = require("./routes/zoomcarAPI");
const paymentRoutes = require("./routes/paymentAPI");

app.use("/zoomcar", zoomcarRoutes);
app.use("/payment", paymentRoutes);

exports.api = functions.https.onRequest(app);
