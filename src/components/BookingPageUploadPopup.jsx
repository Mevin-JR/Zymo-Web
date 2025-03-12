import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";

import UploadSection from "../components/buycomponent/UploadSection";

const BookingPageUploadPopup = ({ isOpen, setIsOpen, setUserUploadData }) => {

    if (!isOpen) return null;

    // To avoid background scrolling when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const [aadharFrontImage, setAadharFrontImage] = useState(null);
    const [aadharBackImage, setAadharBackImage] = useState(null);
    const [drivingFrontImage, setDrivingFrontImage] = useState(null);
    const [drivingBackImage, setDrivingBackImage] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [currentDocType, setCurrentDocType] = useState("aadhar");
    const [currentPage, setCurrentPage] = useState("front");

    const allImagesUploaded =
        drivingFrontImage &&
        drivingBackImage &&
        aadharFrontImage &&
        aadharBackImage;


    const resetAllState = () => {
        setAadharFrontImage(null);
        setAadharBackImage(null);
        setDrivingFrontImage(null);
        setDrivingBackImage(null);
        setCameraOpen(false);
        setCurrentDocType("aadhar");
        setCurrentPage("front");
    };

    const dataURLtoFile = (dataURL, filename) => {
        const arr = dataURL.split(","),
            mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    // To handle image upload
    const handleImageUpload = (type, page, docType) => {
        setCurrentDocType(docType);
        setCurrentPage(page);

        if (type === "camera") {
            setCameraOpen(true);
        } else {
            // Handle Gallery
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = (e) => {
                const file = e.target?.files?.[0];
                if (file) {
                    if (!file.type.startsWith("image/")) {
                        toast.error("Please upload an image file", {
                            position: "top-center",
                            autoClose: 1000,
                        });
                        return;
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const imageUrl = reader.result;
                        if (docType === "driving") {
                            if (page === "front") {
                                setDrivingFrontImage(imageUrl);
                            } else {
                                setDrivingBackImage(imageUrl);
                            }
                        } else if (docType === "aadhar") {
                            if (page === "front") {
                                setAadharFrontImage(imageUrl);
                            } else {
                                setAadharBackImage(imageUrl);
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        }
    };

    //Capture Photo
    const capturePhoto = (imageSrc) => {
        if (currentDocType === "driving") {
            if (currentPage === "front") {
                setDrivingFrontImage(imageSrc);
            } else {
                setDrivingBackImage(imageSrc);
            }
        } else if (currentDocType === "aadhar") {
            if (currentPage === "front") {
                setAadharFrontImage(imageSrc);
            } else {
                setAadharBackImage(imageSrc);
            }
        }
        setCameraOpen(false);
    };

    //Webcam Capture
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

    //Firebase Upload Logic
    const submitData = async (images) => {
        try {
            // Create a timestamp for the folder name once
            const timestamp = Date.now();
            const folderPath = `userImages/${userData.email}_${timestamp}`;

            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const fileRef = ref(appStorage, `${folderPath}/${image.name}`);
                    await uploadBytes(fileRef, image.file_object);
                    return await getDownloadURL(fileRef);
                })
            );

            //Extract URLs of uploaded images
            const [aadharFrontUrl, aadharBackUrl, licenseFrontUrl, licenseBackUrl] = imageUrls;

            const documents = {
                aadhaarFront: aadharFrontUrl,
                aadhaarBack: aadharBackUrl,
                licenseFront: licenseFrontUrl,
                licenseBack: licenseBackUrl,
            };

            resetAllState();
        } catch (error) {
            console.error("Error uploading documents to Firebase:", error);
        }
    };


    //On Submit 
    const handleSubmit = async () => {
        try {
            // Check if all required documents are uploaded
            const images = [
                { file: aadharFrontImage, name: "front_page_aadhar_card" },
                { file: aadharBackImage, name: "back_page_aadhar_card" },
                { file: drivingFrontImage, name: "front_page_driving_license" },
                { file: drivingBackImage, name: "back_page_driving_license" },
            ];

            // Convert base64 strings to File objects and add a 'file_object' property
            const convertedImages = images.map((img) => {
                if (img.file && img.file.startsWith("data:image")) {
                    return {
                        file: img.file,
                        name: img.name,
                        file_object: dataURLtoFile(img.file, img.name),
                    };
                }
                return img;
            });

            const missingImages = convertedImages.filter((img) => !img.file_object);

            if (missingImages.length > 0) {
                toast.error("Please upload all the required documents", {
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }

            setUserUploadData(convertedImages);
            resetAllState();
            setIsOpen(false);
        } catch (error) {
            console.error("Error uploading images:", error);
            resetAllState();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" onClick={() => setIsOpen(false)}>
            <div className="container mx-auto max-w-4xl py-8" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all "
                >
                    <ArrowLeft size={30} />
                </button>

                <div className="bg-[#2A2A2A] p-6 md:p-8 rounded-xl shadow-2xl border border-white/10 max-h-[60vh] overflow-scroll">
                    <div className="space-y-8">
                        <UploadSection
                            title="Upload Driving License Front Page"
                            image={drivingFrontImage}
                            onUpload={(type) => handleImageUpload(type, "front", "driving")}
                        />

                        <UploadSection
                            title="Upload Driving License Back Page"
                            image={drivingBackImage}
                            onUpload={(type) => handleImageUpload(type, "back", "driving")}
                        />

                        <UploadSection
                            title="Upload Aadhar Card Front Page"
                            image={aadharFrontImage}
                            onUpload={(type) => handleImageUpload(type, "front", "aadhar")}
                        />

                        <UploadSection
                            title="Upload Aadhar Card Back Page"
                            image={aadharBackImage}
                            onUpload={(type) => handleImageUpload(type, "back", "aadhar")}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`w-full p-4 rounded-lg font-semibold text-lg transition-transform bg-[#edff8d] text-black 
                            ${allImagesUploaded
                                ? "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                : "cursor-not-allowed"
                            }
                        mt-8`}
                        disabled={!allImagesUploaded}
                    >
                        Confirm
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
                            <X size={24} />
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

export default BookingPageUploadPopup;