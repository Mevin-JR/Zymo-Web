import { useState,useEffect } from 'react';
import {
  Camera,
  Images,
  Check,
  ArrowLeft,
  X,
  ChevronRight ,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const UploadDocuments = () => {
  const navigate = useNavigate();

  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [drivingFrontImage, setDrivingFrontImage] = useState(null);
  const [drivingBackImage, setDrivingBackImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [currentDocType, setCurrentDocType] = useState('aadhar');
  const [currentPage, setCurrentPage] = useState('front');

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

const UploadSection = ({title,image,onUpload}) => (
    <div className="upload-section mb-8">
      <div className="flex items-center gap-2 mb-4">
        {image==null ?<ChevronRight /> :<Check size={30} className="text-[#edff8d] check-icon" />}
        <h3 className="section-title">{title}</h3>
      </div>

      <div>
        <div className="flex justify-center gap-[75px]">
          <button
            onClick={() => onUpload('camera')}
            className="upload-button group"
          >
            <Camera size={30} className="mb-2 text-[#edff8d]" />
          </button>

          <button
            onClick={() => onUpload('gallery')}
            className="upload-button group"
          >
            <Images size={30} className="mb-2 text-[#edff8d]" />
          </button>
        </div>

        {image && (
          <div className="mt-2 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              width={250}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
);

// useEffect(() => {
//     console.log('Aadhar Front Image:', aadharFrontImage);
// }, [aadharFrontImage]);
  
// useEffect(() => {
//     console.log('Aadhar Back Image:', aadharBackImage);
// }, [aadharBackImage]);
  
// useEffect(() => {
//     console.log('Driving Front Image:', drivingFrontImage);
// }, [drivingFrontImage]);
  
// useEffect(() => {
//     console.log('Driving Back Image:', drivingBackImage);
// }, [drivingBackImage]);
  
const allImagesUploaded = drivingFrontImage && drivingBackImage && aadharFrontImage && aadharBackImage;

const handleSubmit =async()=>{
    try{
        const images = [
            { file: aadharFrontImage, name: 'aadhar_front' },
            { file: aadharBackImage, name: 'aadhar_back' },
            { file: drivingFrontImage, name: 'driving_front' },
            { file: drivingBackImage, name: 'driving_back' }
        ];
        const missingImages = images.filter(img => !img.file);
        if (missingImages.length > 0) {
          console.log('Please upload all the required documents!');
          return;
        }
        // const imageUrls = await Promise.all(
        //     images.map(async (image) => {
        //       const formData = new FormData();
        //       formData.append('file', image.file);
        //       formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Cloudinary preset
      
        //       // Send the image to Cloudinary (or S3)
        //       const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
              
        //       return response.data.secure_url; 
        //     })
        // );

        // const [aadharFrontUrl, aadharBackUrl, drivingFrontUrl, drivingBackUrl] = imageUrls;

        // Send the URLs to the backend to store in the database
        // const response = await axios.post('/your-api-endpoint-to-store-urls', {
        //     aadharFrontUrl,
        //     aadharBackUrl,
        //     drivingFrontUrl,
        //     drivingBackUrl
        // });
    
        // if (response.status === 200) {
        //     console.log('Images uploaded and URLs saved successfully');
        // }
        // navigate('');
    }catch(error){
        console.error('Error uploading images:', error);
    }
}
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <button
            onClick={() => navigate(-1)}
            className="absolute left-1 md:left-5 top-10 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all "
            >
            <ArrowLeft size={30} />
        </button>

        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
                You're just one step away from{' '}
                <span className="text-[#edff8d]">Booking</span>
            </h1>
        </div>

        <div className="bg-[#2A2A2A] p-6 md:p-8 rounded-xl shadow-2xl">
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
    </div>
  );
};

export default UploadDocuments;
