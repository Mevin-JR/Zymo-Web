import { useState, useEffect } from "react";
import { FaCamera, FaImages, FaTrash } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { IoMdRefreshCircle } from "react-icons/io";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { webDB, webStorage, appAuth } from "../utils/firebase"; // Import Firebase configuration
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import NavBar from "../components/NavBar";


function UserNavigation(label) {
  ReactGA.event({
    category: 'User Interaction',
    action: 'User Dashboard',
    label: label, 
  });
}


export default function YourDetails() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    licenseFront: null,
    licenseBack: null,
    aadhaarFront: null,
    aadhaarBack: null,
    uploaded: {
      licenseFront: false,
      licenseBack: false,
      aadhaarFront: false,
      aadhaarBack: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);  // Loading state for save button
  const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
      const unsubscribe = appAuth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            
            // Check if user profile exists
            const q = query(
              collection(webDB, "webUserProfiles"),
              where("email", "==", user.email)
            );
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const docData = querySnapshot.docs[0].data();
              setFormData({
                name: docData.name,
                phone: docData.phone,
                email: docData.email,
                dob: docData.dob,
                licenseFront: docData.licenseFront,
                licenseBack: docData.licenseBack,
                aadhaarFront: docData.aadhaarFront,
                aadhaarBack: docData.aadhaarBack,
                uploaded: docData.uploaded,
              });
            } else {
              // Set email from authenticated user if no profile exists
              setFormData(prev => ({
                ...prev,
                name: user.displayName || "",
                email: user.email || "",
                phone: user.phoneNumber || ""
              }));
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
      return () => unsubscribe();
    }, []);

  useEffect(() => {
    if (isSaved) {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  // Check if all fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.email.trim() &&
      formData.dob.trim() &&
      formData.licenseFront &&
      formData.licenseBack &&
      formData.aadhaarFront &&
      formData.aadhaarBack
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleUpload = (name) => {
    setFormData({
      ...formData,
      uploaded: { ...formData.uploaded, [name]: true },
      [name]: formData[name],
    });
  };

  const handleDeleteAccount = () => {
    console.log("Account Deleted");
    UserNavigation("User Deleted Account");
  };

  // Function to upload a file to Firebase Storage and return its download URL
  const uploadFile = async (file, path) => {
    const storageRef = ref(webStorage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Function to save user details to Firestore
  const handleSave = async () => {
    if (!isFormValid()) {
      alert("Please fill all fields and upload all documents.");
      return;
    }

    setIsSaving(true); // Disable save button while saving

    try {
      // Upload files to Firebase Storage and get their URLs
      const licenseFrontURL = await uploadFile(formData.licenseFront, `documents/${formData.email}/licenseFront`);
      const licenseBackURL = await uploadFile(formData.licenseBack, `documents/${formData.email}/licenseBack`);
      const aadhaarFrontURL = await uploadFile(formData.aadhaarFront, `documents/${formData.email}/aadhaarFront`);
      const aadhaarBackURL = await uploadFile(formData.aadhaarBack, `documents/${formData.email}/aadhaarBack`);

      // Create user profile object
      const userProfile = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        dob: formData.dob,
        licenseFront: licenseFrontURL,
        licenseBack: licenseBackURL,
        aadhaarFront: aadhaarFrontURL,
        aadhaarBack: aadhaarBackURL,
        uploaded: formData.uploaded,
      };

      // Add the user profile to the Firestore collection
      const docRef = await addDoc(collection(webDB, "webUserProfiles"), userProfile);
      console.log("Document written with ID: ", docRef.id);
      setIsSaved(true); // Set saved state instead of alert

      UserNavigation("User Profile Saved");
    } catch (error) {
      console.error("Error saving profile: ", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false); // Re-enable save button
    }
  };

  return (
    <>
    <NavBar/>
      <button
        onClick={() => navigate("/")}
        className="text-white m-5 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="min-h-screen bg-[#212121] p-4 flex justify-center items-center">
        <div className="w-full max-w-lg bg-[#424242] p-6 rounded-lg shadow-lg text-white font-sans">
          <h2 className="text-xl font-semibold mb-4 flex justify-center items-center">Profile Details</h2>

          {isSaved && (
            <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">
              Profile saved successfully!
            </div>
          )}

          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 bg-white text-black"
            placeholder="Enter name"
            required
            readOnly
          />

          <label className="block mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 bg-white text-black"
            placeholder="Enter phone"
            required
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 bg-white text-black"
            placeholder="Enter email"
            required
            readOnly
/>

          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 bg-white text-black"
            required
          />

          {Object.keys(formData.uploaded).map((name, index) => (
            <div key={index} className="mt-4">
              <div className="flex items-center">
                {formData.uploaded[name] ? (
                  <IoIosCheckbox size={24} />
                ) : (
                  <div className="w-5 h-5 border border-black rounded-sm"></div>
                )}
                <label className="block flex-1 capitalize ml-2">
                  {name === "licenseFront" && "Upload Driving License Front Page"}
                  {name === "licenseBack" && "Upload Driving License Back Page"}
                  {name === "aadhaarFront" && "Upload Aadhaar Card Front Page"}
                  {name === "aadhaarBack" && "Upload Aadhaar Card Back Page"}
                </label>
              </div>
              {formData[name] && !formData.uploaded[name] && (
                <div className="mt-2 flex flex-col items-center">
                  <img
                      src={
                        typeof formData[name] === 'string' 
                          ? formData[name]  // Use existing URL
                          : formData[name] instanceof Blob 
                            ? URL.createObjectURL(formData[name])  // Handle new files
                            : ''  // Fallback for invalid types
                      }
                    alt="Uploaded Preview"
                    className="w-32 h-32 object-cover rounded-lg mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFormData({ ...formData, [name]: null })}
                      className="px-4 py-1 bg-[#edff8d] text-black rounded-md flex items-center gap-2"
                    >
                      <IoMdRefreshCircle size={30} />
                    </button>
                    <button
                      onClick={() => handleUpload(name)}
                      className="px-4 py-1 bg-black text-white rounded-md"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}
              {formData.uploaded[name] && (
                <div className="mt-2 flex flex-col items-center">
                  <img
                     src={
                      typeof formData[name] === 'string' 
                        ? formData[name]  // Existing URL
                        : ''  // Fallback
                    }
                    alt="Uploaded Image"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              {!formData[name] && (
                <div className="flex gap-4 mt-2 justify-center">
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCamera size={24} color="#edff8d" />
                    <input type="file" accept="image/*" capture="camera" name={name} onChange={handleFileChange} className="hidden" required />
                  </label>
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaImages size={24} color="#edff8d" />
                    <input type="file" accept="image/*" name={name} onChange={handleFileChange} className="hidden" required />
                  </label>
                </div>
              )}
            </div>
          ))}

          <button
            className="w-full bg-white text-black p-2 rounded-lg mt-2 flex items-center justify-center gap-2 hover:bg-gray-300"
            onClick={handleDeleteAccount}
          >
            <FaTrash /> Delete Account
          </button>

          {/* Save Button */}
          <button
            className={`w-full bg-[#edff8d] text-black p-2 rounded-lg mt-4 flex items-center justify-center gap-2 ${
              !isFormValid() || isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-[#d4e07d]"
            }`}
            onClick={handleSave}
            disabled={!isFormValid() || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}