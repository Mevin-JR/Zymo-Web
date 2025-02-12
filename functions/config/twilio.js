const twilio = require("twilio");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses form data


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const whatsapp_messaging_service_id=process.env.TWILIO_WHATSAPP_SERVICE_ID;
const verify_service_id_thr_whatsapp=process.env.TWILIO_VERIFY_SERVICE_SID;

const send_whatsapp_message_booking_confirm_template_id = process.env.WHATSAPP_TEMPLATE_BOOKING_CONFIRM;
const send_whatsapp_message_booking_confirm_vendor_template_id = process.env.WHATSAPP_TEMPLATE_BOOKING_CONFIRM_VENDOR;
const send_whatsapp_message_refund_template_id = process.env.WHATSAPP_TEMPLATE_REFUND;
const send_whatsapp_message_booking_cancel_template_id = process.env.WHATSAPP_TEMPLATE_BOOKING_CANCEL;

const client = twilio(accountSid, authToken);


//Send otp to the user through Whatsapp
async function sendOtp(phone) {
    try {
      // Validate phone number
      if (!phone || typeof phone !== 'string' || phone.length < 10) {
        throw new Error('Invalid phone number: Enter the right phone number');
      }
    
      const verification = await client.verify.v2
        .services(verify_service_id_thr_whatsapp)
        .verifications.create({
          channel: 'whatsapp',
          to: phone,
        });
  
      console.log('OTP Sent via WhatsApp:', verification.status);
      console.log('Response: ',verification)
      return { message: 'OTP sent via WhatsApp', status: verification.status };
    } catch (error) {
      console.error('WhatsApp OTP failed:', error.message);
      return sendOtpFallback(phone); // Fallback to SMS
    }
}

//Send otp to the user through message (if whatsapp failed)
async function sendOtpFallback(phone) {
    // Validate phone number
    if (!phone || typeof phone !== 'string' || phone.length < 10) {
        throw new Error('Invalid phone number: Enter the right phone number');
    }
    try {
      const verification = await client.verify.v2
        .services(verify_service_id_thr_whatsapp)
        .verifications.create({
          channel: 'sms',
          to: phone,
        });
  
      console.log('OTP Sent via SMS:', verification.status);
      return { message: 'OTP sent via SMS', status: verification.status };
    } catch (error) {
      console.error('SMS OTP failed:', error.message);
      return { error: error.message };
    }
}
  
// ✅ Verify OTP
async function verifyOtp(phone, code) {
    try {
      // Validate phone number
      if (!phone || phone.length < 10) {
        throw new Error('Invalid phone number');
      }
        if (!code || phone.length < 6) {
        throw new Error('Invalid OTP code');
      }
  
      const verificationCheck = await client.verify.v2
        .services(verify_service_id_thr_whatsapp)
        .verificationChecks.create({
          to: `whatsapp:${phone}`,
          code,
        });
  
      console.log('Verification Status:', verificationCheck.status);
  
      if (verificationCheck.status === 'approved') {
        return { message: 'OTP Verified Successfully' };
      } else {
        return { message: 'Invalid OTP', error: true };
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return { error: error.message };
    }
}

//Whatsapp message to user 
async function sendWhatsAppMessage(recipient) {
  try {
    const response = await client.messages.create({
      from: whatsapp_messaging_service_id, // WhatsApp  Messaging Services id
      to: `whatsapp:${recipient}`,// "whatsapp:+917517442597",
      contentSid: send_whatsapp_message_booking_confirm_template_id, //Template name - zymo_bc_zc
      contentVariables: JSON.stringify({ 
        "1": "John Doe",                      // Customer Name
        "2": "Sedan, Automatic",              // Car and Transmission Type
        "3": "Airport Terminal 1",            // Pick-up Location
        "4": "ABC12345",                      // Booking ID
        "5": "100",                           // Free KMs
        "6": "2025-02-15",                    // Start Date
        "7": "2025-02-20",                    // End Date
        "8": "Ghaziabad",                     // City
        "9": "+917517442597"                  // Phone Number      
       }),
    });

    // console.log('Message:',response);
    // console.log(`Message sent to ${to}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send message: ${error}`);
  }
}

// Whatsapp message to user if booked through vendor
async function sendWhatsAppMessageincludevendor(recipient) {
  try {
    const response = await client.messages.create({
      from: whatsapp_messaging_service_id,  // WhatsApp Messaging Services id
      to: `whatsapp:${recipient}`,// "whatsapp:+917517442597",
      contentSid: send_whatsapp_message_booking_confirm_vendor_template_id, //Template name - zymo_bc_nz
      contentVariables: JSON.stringify({ 
        "1": "John Doe",                      // Customer Name
        "2": "Sedan, Automatic",              // Car and Transmission Type
        "3": "Airport Terminal 1",            // Pick-up Location
        "4": "ABC12345",                      // Booking ID
        "5": "Zymo Rentals",                  // Vendor Name
        "6": "+917517442597",                 // Mobile Number
        "7": "johndoe@example.com",           // Email ID
        "8": "Self Drive",                    // Service Type
        "9": "Ghaziabad",                     // City
        "10": "2025-02-15 10:00 AM",          // Start Date & Time
        "11": "2025-02-20 06:00 PM",          // End Date & Time
        "12": "₹5000",                        // Amount
        "13": "1990-05-12",                   // Date of Birth
        "14": "Unlimited KMs Package",        // Package
        "15": "Online Payment",               // Mode
        "16": "Zymo Hub, Ghaziabad"           // Vendor Location
      }) ,
    });

    // console.log('Message:',response);
    // console.log(`Message sent to ${to}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send message: ${error}`);
  }
}

//Refund message 
async function refund_message(recipient) {
  try {
    const response = await client.messages.create({
      from: whatsapp_messaging_service_id, // WhatsApp Messaging Service ID
      to: `whatsapp:${recipient}`,  // "whatsapp:+917517442597",
      contentSid: send_whatsapp_message_refund_template_id, // Template ID
      contentVariables: JSON.stringify({
        "1": "John Doe",  // Customer Name
        "2": "ABC12345", // Booking ID
        "3": "Sedan, Automatic" // Car and Transmission Type
      }),
    });

    console.log(`Message sent to ${recipient}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send message: ${error.message}`);
  }
}

//Booking cancel Message 
async function booking_cancel_message(recipient) {
  try {
    const response = await client.messages.create({
      from: whatsapp_messaging_service_id, // WhatsApp Messaging Service ID
      to: `whatsapp:${recipient}`,// "whatsapp:+917517442597",
      contentSid: send_whatsapp_message_booking_cancel_template_id, // Template ID
      contentVariables: JSON.stringify( {
        "1": "John Doe",  // Customer Name
        "2": "ABC12345", // Booking ID
        "3": "Airport Terminal 1", // Location
        "4": "Sedan, Automatic" // Car
      }),
    });

    console.log(`Message sent to ${recipient}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send message: ${error.message}`);
  }
}


//To send otp to the user
//Request
// {
//   "phone": "+917517442597",
// }
//Response
// {
//   sid: '',
//   serviceSid: '',
//   accountSid: '',
//   to: '+',
//   channel: 'whatsapp',
//   status: 'pending',
//   valid: false,
//   lookup: { carrier: null },
//   amount: null,
//   payee: null,
//   sendCodeAttempts: [
//     {
//       attempt_sid: '',
//       channel: 'whatsapp',
//       time: '2025-02'
//     }
//   ],
//   dateCreated: 2025-02-11T14:02:47.000Z,
//   dateUpdated: 2025-02-11T14:02:47.000Z,
//   sna: undefined,
//   url: ''
// }



//Verify otp response
//Request
// {
//   "phone": "+917517442597",
//   "code": "031579"
// }

//Response
// {
//   sid: '',
//   serviceSid: '',
//   accountSid: '',
//   to: '+917517442597',
//   channel: 'whatsapp',
//   status: 'approved',
//   valid: true,
//   amount: null,
//   payee: null,
//   dateCreated: 2025-02-11T13:55:31.000Z,
//   dateUpdated: 2025-02-11T13:59:52.000Z,
//   snaAttemptsErrorCodes: undefined
// }

//  Invalid OTP
// {
//   sid: '',
//   serviceSid: '',
//   accountSid: '',
//   to: '+917517442597',
//   channel: 'whatsapp',
//   status: 'pending',
//   valid: false,
//   amount: null,
//   payee: null,
//   dateCreated: 2025-02-11T14:02:47.000Z,
//   dateUpdated: 2025-02-11T14:08:48.000Z,
//   snaAttemptsErrorCodes: undefined
// }

