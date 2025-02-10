const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");

function getRazorpayInstance() {
    const keyId =
        process.env.RAZORPAY_TEST_KEY ||
        defineSecret("RAZORPAY_TEST_KEY").value();
    const keySecret =
        process.env.RAZORPAY_TEST_KEY_SECRET ||
        defineSecret("RAZORPAY_TEST_KEY_SECRET").value();

    return Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
}

module.exports = getRazorpayInstance;
