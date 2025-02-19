import { useState } from "react";
import { FaCamera, FaImages, FaTrash} from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { IoMdRefreshCircle } from "react-icons/io";

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
  };

  return (
    <div className="min-h-screen bg-[#212121] p-4 flex justify-center items-center">
      <div className="w-full max-w-lg bg-[#424242] p-6 rounded-lg shadow-lg text-white font-sans">
        <h2 className="text-xl font-semibold mb-4 flex justify-center items-center">Profile Details</h2>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 bg-white text-black"
          placeholder="Enter name"
        />

        <label className="block mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 bg-white text-black"
          placeholder="Enter phone"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 bg-white text-black"
          placeholder="Enter email"
        />

        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3bg-white text-black"
        />

        {Object.keys(formData.uploaded).map((name, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-center">
              {formData.uploaded[name] ? (
                <IoIosCheckbox  size={24} />
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
                  src={URL.createObjectURL(formData[name])}
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
                  src={URL.createObjectURL(formData[name])}
                  alt="Uploaded Image"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            {!formData[name] && (
              <div className="flex gap-4 mt-2 justify-center">
                <label className="cursor-pointer flex flex-col items-center">
                  <FaCamera size={24} color="#edff8d" />
                  <input type="file" accept="image/*" capture="camera" name={name} onChange={handleFileChange} className="hidden" />
                </label>
                <label className="cursor-pointer flex flex-col items-center">
                  <FaImages size={24} color="#edff8d" />
                  <input type="file" accept="image/*" name={name} onChange={handleFileChange} className="hidden" />
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
      </div>
    </div>
  );
}  
