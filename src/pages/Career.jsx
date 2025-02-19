import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CareerForm = () => {
    const [selectedType, setSelectedType] = useState("Internship");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        city: "",
        phoneNumber: "",
        aspirations: "",
        primarySkill: "",
        skillsDescription: "",
        resume: null,
        expectedStipend: "",
    });
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.city || !formData.phoneNumber || !formData.aspirations || !formData.primarySkill || !formData.skillsDescription || !formData.resume || !formData.expectedStipend) {
            alert("All fields are required!");
            return;
        }

        try {
            let resumeURL = "";
            if (formData.resume) {
                const resumeRef = ref(storage, `resumes/${formData.email}-${Date.now()}`);
                await uploadBytes(resumeRef, formData.resume);
                resumeURL = await getDownloadURL(resumeRef);
            }
            await addDoc(collection(db, "careerApplications"), {
                ...formData,
                resume: resumeURL,
                jobType: selectedType,
                timestamp: new Date()
            });
            setFormData({
                fullName: "",
                email: "",
                city: "",
                phoneNumber: "",
                aspirations: "",
                primarySkill: "",
                skillsDescription: "",
                resume: null,
                expectedStipend: "",
            });
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            
            // Scroll to the top of the page after submission
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Error submitting application: ", error);
            alert("Error submitting application. Please try again.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[darkGrey2] text-white relative">
                {showPopup && (
                    <div className="absolute top-10 bg-green-500 text-white p-3 rounded-lg shadow-lg">
                        Your application has been submitted successfully!
                    </div>
                )}
                <h1 className="text-2xl font-bold text-[#faffa4] mb-6">“Join Us”</h1>
                <p className="text-gray-450 mb-6">Choose your adventure.</p>
                <div className="flex space-x-4">
                    <button
                        className={`px-6 py-2 text-black font-semibold rounded-lg transition duration-300 ${selectedType === "Internship" ? "bg-[#faffa4]" : "bg-gray-300"}`}
                        onClick={() => setSelectedType("Internship")}
                    >
                        Internship
                    </button>
                    <button
                        className={`px-6 py-2 text-black font-semibold rounded-lg transition duration-300 ${selectedType === "Full-time" ? "bg-[#faffa4]" : "bg-gray-300"}`}
                        onClick={() => setSelectedType("Full-time")}
                    >
                        Full-time
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="bg-[#363636] shadow-lg rounded-lg p-6 mt-6 w-96 text-black">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <input type="text" name="aspirations" value={formData.aspirations} onChange={handleChange} placeholder="Aspirations" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <label className="block font-semibold text-gray-100 mb-2">Pick your superpower</label>
                    <select name="primarySkill" value={formData.primarySkill} onChange={handleChange} className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required>
                        <option value="">Select Primary Skill</option>
                        <option value="Coding">Coding</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea name="skillsDescription" value={formData.skillsDescription} onChange={handleChange} placeholder="Tell us why we need you" className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required />
                    <label className="block font-semibold text-gray-100 mb-2">Upload Your Resume</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full p-3 mb-4 bg-gray-200 rounded-lg cursor-pointer" required />
                    <label className="block font-semibold text-gray-100 mb-2">Expected Stipend</label>
                    <select name="expectedStipend" value={formData.expectedStipend} onChange={handleChange} className="w-full p-3 mb-4 bg-gray-200 rounded-lg" required>
                        <option value="">Expected Stipend</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                    <button type="submit" className="w-full bg-[#faffa4] text-black py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#faffa4]-700">Submit Application</button>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
};

export default CareerForm;
