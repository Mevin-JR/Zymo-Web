import { useState,useEffect } from 'react';
import {ArrowLeft,X,} from 'lucide-react';
import { useNavigate,useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmPage from '../../components/ConfirmPage';
import UploadSection from '../../components/buycomponent/UploadSection';

// Function to dynamically load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
  });
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const UploadDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [drivingFrontImage, setDrivingFrontImage] = useState(null);
  const [drivingBackImage, setDrivingBackImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [currentDocType, setCurrentDocType] = useState('aadhar');
  const [currentPage, setCurrentPage] = useState('front');
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const { car , startDate , userData} = location.state || {};

  const functionsUrl = import.meta.env.VITE_FUNCTIONS_API_URL;
  
const handleImageUpload = (type, page, docType) => {
    setCurrentDocType(docType);
    setCurrentPage(page);
    
    if (type === 'camera') {
      setCameraOpen(true); // Open the webcam modal
    } else {
      // Handle gallery selection here
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
  
      input.onchange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageUrl = reader.result;
            if (docType === 'driving') {
              if (page === 'front') {
                setDrivingFrontImage(imageUrl);
                console.log('Driving Front Image:', imageUrl); // Log the captured image URL
              } else {
                setDrivingBackImage(imageUrl);
                console.log('Driving Back Image:', imageUrl); // Log the captured image URL
              }
            } else if (docType === 'aadhar') {
              if (page === 'front') {
                setAadharFrontImage(imageUrl);
                console.log('Aadhar Front Image:', imageUrl); // Log the captured image URL
              } else {
                setAadharBackImage(imageUrl);
                console.log('Aadhar Back Image:', imageUrl); // Log the captured image URL
              }
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
};
  
const capturePhoto = (imageSrc) => {
    if (currentDocType === 'driving') {
      if (currentPage === 'front') {
        setDrivingFrontImage(imageSrc);
        console.log('Driving Front Image:', imageSrc); // Log the captured image URL
      } else {
        setDrivingBackImage(imageSrc);
        console.log('Driving Back Image:', imageSrc); // Log the captured image URL
      }
    } else if (currentDocType === 'aadhar') {
      if (currentPage === 'front') {
        setAadharFrontImage(imageSrc);
        console.log('Aadhar Front Image:', imageSrc); // Log the captured image URL
      } else {
        setAadharBackImage(imageSrc);
        console.log('Aadhar Back Image:', imageSrc); // Log the captured image URL
      }
    }
    setCameraOpen(false); // Close the camera modal after capturing the photo
};

const WebcamCapture = () => {
    return (
      <Webcam
        audio={false}
        height={500}
        screenshotFormat="image/jpeg"
        width={500}
        className="text-center"
      >
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
              if (imageSrc) {
                capturePhoto(imageSrc);
              }
            }}
            className="mt-4 bg-[#edff8d] p-3 rounded-lg text-black"
          >
            Capture photo
          </button>
        )}
      </Webcam>
    );
};
  
const allImagesUploaded = drivingFrontImage && drivingBackImage && aadharFrontImage && aadharBackImage;

//Create order
const createOrder = async (amount, currency) => {
    try {
        const response = await axios.post(
            `${functionsUrl}/payment/create-order`,
              {
                amount,
                currency,
              }
          );
          return response.data.data;
      } catch (error) {
          console.error("Error creating order:", error);
          toast.error("Error creating payment", {
              position: "top-center",
              autoClose: 1000 * 5,
          });
          throw error;
    }
};

const handlePayment = async () => {

  await delay(1000);
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    console.error("Razorpay SDK failed to load!");
    toast.error("Could not load razorpay, Please try again later...", {
        position: "top-center",
        autoClose: 1000 * 5,
    });
    return;
  }

  try {
      const amount = parseInt(car.totalAmount);  //pass the amount
      const orderData = await createOrder(amount, "INR");
      console.log("Order Data:", orderData);
      const options = {
          key: import.meta.env.VITE_RAZORPAY_TEST_KEY,
          amount: orderData.amount,
          currency: "INR",
          name: "Zymo",
          description: "Zymo is India's largest aggregator for self-drive car rentals.",
          image: "/images/AppLogo/zymo2.jpg",
          order_id: orderData.id,
          handler: async function (response) {
              const data = {
                  ...response,
              };
              const res = await axios.post(
                  `${functionsUrl}/payment/verifyPayment`,
                  data
              );

              // Payment successful
              if (res.data.success) {
                  setIsConfirmPopupOpen(true);
                  // Create booking
                  // createBooking(data).catch((error) => {
                  //     console.error("Booking error:", error);
                  //     console.log(
                  //         "Initiating refund due to booking failure"
                  //     );
                  //     initiateRefund(data.razorpay_payment_id).then(
                  //         (refundResponse) => {
                  //             if (refundResponse.status === "processed") {
                  //                 navigate("/");
                  //                 toast.success(
                  //                     "A refund has been processed, please check your mail for more details",
                  //                     {
                  //                         position: "top-center",
                  //                         autoClose: 1000 * 10,
                  //                     }
                  //                 );
                  //             }
                  //         }
                  //     );
                  // });
              } else {
                  toast.error("Payment error, Please try again...", {
                      position: "top-center",
                      autoClose: 1000 * 5,
                  });
              }
          },
          theme: {
            color: "#000",
            backdrop_color: "#000",
          },
          prefill: {
            name: userData.name,
            email: userData.email,
            contact: userData.phone,
          },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", async function (response) {
          console.log("Payment failed:", response.error);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
      });

      rzp1.on("payment.error", function (response) {
          console.log("Payment error:", response.error);
      });

      rzp1.open();
  } catch (error) {
      console.error("Error during payment initiation:", error);
  }
};
const uploadDataToFirebase = async () => {
  try {

      // Upload the images to Firebase Storage
      // const imageUrls = await Promise.all(
      //     images.map(async (image) => {
      //         const storageRef = firebase.storage().ref();
      //         const fileRef = storageRef.child(`documents/${image.name}_${Date.now()}`);
      //         await fileRef.put(image.file);
      //         return await fileRef.getDownloadURL(); // Get the download URL of the uploaded file
      //     })
      // );

      // Extract URLs of uploaded images
      // const [aadharFrontUrl, aadharBackUrl, drivingFrontUrl, drivingBackUrl] = imageUrls;

      // Prepare the data to send to Firestore
      // const data = {
      //     aadharFrontUrl,
      //     aadharBackUrl,
      //     drivingFrontUrl,
      //     drivingBackUrl,
      //     userId: userData.id, // Example: Send user ID or other data to Firestore
      //     userName: userData.name,
      //     userEmail: userData.email,
      //     userPhone: userData.phone,
      //     createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Save the timestamp
      // };

      // // Get a reference to Firestore
      // const db = firebase.firestore();
      
      // Add the data to a collection (e.g., 'userDocuments')
      // await db.collection('userDocuments').add(data);

      toast.success('Documents uploaded successfully!', {
          position: 'top-center',
          autoClose: 3000,
      });
      
  } catch (error) {
      console.error('Error uploading documents to Firebase:', error);
      toast.error('Error uploading documents. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
      });
  }
};

const handleSubmit =async()=>{
    try{
      // Check if all required documents are uploaded
      const images = [
        { file: aadharFrontImage, name: 'aadhar_front' },
        { file: aadharBackImage, name: 'aadhar_back' },
        { file: drivingFrontImage, name: 'driving_front' },
        { file: drivingBackImage, name: 'driving_back' }
      ];

      const missingImages = images.filter(img => !img.file);

      if (missingImages.length > 0) {
          console.log('Please upload all the required documents!');
          toast.error('Please upload all the required documents', {
              position: 'top-center',
              autoClose: 3000,
          });
          return;
      }

      // Proceed with payment first
      await handlePayment(); 

      // After payment is successful, upload the data to Firebase
      await uploadDataToFirebase(); 

    }catch(error){
        console.error('Error uploading images:', error);
    }
}

  return (
    <div className="min-h-screen bg-[#212121]  text-white px-4 md:px-8">
      <div className="container mx-auto max-w-4xl py-8">
        <button
            onClick={() => navigate(-1)}
            className="absolute left-1 md:left-5 top-10 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all "
            >
            <ArrowLeft size={30} />
        </button>

        <div className="text-center mb-6 md:mb-10">
            <h1 className="text-xl md:text-4xl font-bold">
                You're just one step away from{' '}
                <span className="text-[#edff8d]">Booking</span>
            </h1>
        </div>

        <div className="bg-[#2A2A2A] p-6 md:p-8 rounded-xl shadow-2xl border border-white/10">
          <div className="space-y-8">
            <UploadSection
              title="Upload Driving License Front Page"
              image={drivingFrontImage}
              onUpload={(type) => handleImageUpload(type, 'front', 'driving')}
            />

            <UploadSection
              title="Upload Driving License Back Page"
              image={drivingBackImage}
              onUpload={(type) => handleImageUpload(type, 'back', 'driving')}
            />

            <UploadSection
              title="Upload Aadhar Card Front Page"
              image={aadharFrontImage}
              onUpload={(type) => handleImageUpload(type, 'front', 'aadhar')}
            />

            <UploadSection
              title="Upload Aadhar Card Back Page"
              image={aadharBackImage}
              onUpload={(type) => handleImageUpload(type, 'back', 'aadhar')}
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full p-4 rounded-lg font-semibold text-lg transition-transform bg-[#edff8d] text-black 
              ${
                allImagesUploaded
                  ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'cursor-not-allowed'
              }
              mt-8`}
            disabled={!allImagesUploaded}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Modal for Camera */}
      {cameraOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#121212] p-6 rounded-lg w-[90%] md:w-[600px] text-white text-center relative">
            <button
              onClick={() => setCameraOpen(false)}
              className="absolute top-2 right-2 text-white"
            >
              <X size={24} /> {/* The X icon */}
            </button>

            <h3 className="text-xl mb-4">Take a Photo</h3>
            <div className="text-center">
              <WebcamCapture />
            </div>
          </div>
        </div>
      )}

      <ConfirmPage
        isOpen={isConfirmPopupOpen}
        close={() => setIsConfirmPopupOpen(false)}
      />
    </div>
  );
};

export default UploadDocuments;