const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");

const keyId =
    process.env.RAZORPAY_TEST_KEY || defineSecret("RAZORPAY_TEST_KEY");
const keySecret =
    process.env.RAZORPAY_TEST_KEY_SECRET ||
    defineSecret("RAZORPAY_TEST_KEY_SECRET");

const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});

module.exports = razorpay;
