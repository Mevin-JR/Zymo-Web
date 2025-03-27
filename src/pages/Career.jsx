import { useState , useEffect} from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { webDB, webStorage } from "../utils/firebase";
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
         stipendAmountOption: "",
        stipendAmountCustom: "",
        applyFor: ""
    });
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkSubmission = async () => {
            const submittedEmail = localStorage.getItem('careerFormSubmittedEmail');
            if (submittedEmail) {
                const q = query(
                    collection(webDB, "careerApplications"),
                    where("email", "==", submittedEmail)
                );
                const querySnapshot = await getDocs(q);
                setHasSubmitted(!querySnapshot.empty);
            }
        };
        checkSubmission();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for existing application
        const emailQuery = query(
            collection(webDB, "careerApplications"),
            where("email", "==", formData.email)
        );
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
            alert("You've already submitted an application with this email.");
            return;
        }

        // Existing validation logic
        const isPaid = formData.expectedStipend === "Paid";
        const amountValid = isPaid 
            ? (formData.stipendAmountOption === "Other" 
                ? formData.stipendAmountCustom 
                : formData.stipendAmountOption)
            : true;

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.city ||
            !formData.phoneNumber ||
            !formData.aspirations ||
            !formData.primarySkill ||
            !formData.skillsDescription ||
            !formData.resume ||
            !formData.expectedStipend||
            !formData.applyFor
        ) {
            alert("All fields are required!");
            return;
        }

        try {
            let resumeURL = "";
            if (formData.resume) {
                const resumeRef = ref(
                    webStorage,
                    `resumes/${formData.email}-${Date.now()}`
                );
                await uploadBytes(resumeRef, formData.resume);
                resumeURL = await getDownloadURL(resumeRef);
            }

            const applicationData = {
                fullName: formData.fullName,
                email: formData.email,
                city: formData.city,
                phoneNumber: formData.phoneNumber,
                aspirations: formData.aspirations,
                primarySkill: formData.primarySkill,
                skillsDescription: formData.skillsDescription,
                resume: resumeURL,
                expectedStipend: formData.expectedStipend,
                jobType: selectedType,
                timestamp: new Date(),
                applyFor: formData.applyFor
            };

            if (isPaid) {
                applicationData.experience = formData.experience;
                applicationData.stipendAmount = formData.stipendAmountOption === "Other"
                    ? formData.stipendAmountCustom
                    : formData.stipendAmountOption;
            }

            await addDoc(collection(webDB, "careerApplications"), applicationData);
            
            localStorage.setItem('careerFormSubmittedEmail', formData.email);
            setHasSubmitted(true);
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
                {hasSubmitted ? (
                    <div className="text-center">
                        <div className="text-4xl mb-4 text-[#faffa4]">✓</div>
                        <h2 className="text-2xl font-bold mb-4 text-[#faffa4]">
                            Form submitted successfully!
                        </h2>
                        <p className="text-gray-300">
                            Check your email for further details.
                        </p>
                    </div>
                ) : (
                    <>
                <h1 className="text-2xl font-bold text-[#faffa4] mb-6">
                    “Join Us”
                </h1>
                <p className="text-gray-450 mb-6">Choose your adventure.</p>
                <div className="flex space-x-4">
                    <button
                        className={`px-6 py-2 text-black font-semibold rounded-lg transition duration-300 ${selectedType === "Internship"
                                ? "bg-[#faffa4]"
                                : "bg-gray-300"
                            }`}
                        onClick={() => setSelectedType("Internship")}
                    >
                        Internship
                    </button>
                    <button
                        className={`px-6 py-2 text-black font-semibold rounded-lg transition duration-300 ${selectedType === "Full-time"
                                ? "bg-[#faffa4]"
                                : "bg-gray-300"
                            }`}
                        onClick={() => setSelectedType("Full-time")}
                    >
                        Full-time
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#363636] shadow-lg rounded-lg p-6 mt-6 w-96 text-black"
                >
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="aspirations"
                        value={formData.aspirations}
                        onChange={handleChange}
                        placeholder="Aspirations"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="Applying For: "
                        value={formData.applyFor}
                        onChange={handleChange}
                        placeholder="Applying For:"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <label className="block font-semibold text-gray-100 mb-2">
                        Pick your superpower
                    </label>
                    <select
                        name="primarySkill"
                        value={formData.primarySkill}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    >
                        <option value="">Select Primary Skill</option>
                        <option value="Coding">Coding</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea
                        name="skillsDescription"
                        value={formData.skillsDescription}
                        onChange={handleChange}
                        placeholder="Tell us why we need you"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    />
                    <label className="block font-semibold text-gray-100 mb-2">
                        Upload Your Resume
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg cursor-pointer"
                        required
                    />
                    <label className="block font-semibold text-gray-100 mb-2">
                        Expected Stipend
                    </label>
                    <select
                        name="expectedStipend"
                        value={formData.expectedStipend}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                        required
                    >
                        <option value="">Expected Stipend</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                    {formData.expectedStipend === "Paid" && (
                        <>
                            <label className="block font-semibold text-gray-100 mb-2">
                                Experience
                            </label>
                            <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                                required
                            >
                                <option value="">Select Experience</option>
                                <option value="3-6 months">3-6 months</option>
                                <option value="6+ months">6+ months</option>
                            </select>

                            <label className="block font-semibold text-gray-100 mb-2">
                                Expected Amount
                            </label>
                            <select
                                name="stipendAmountOption"
                                value={formData.stipendAmountOption}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                                required
                            >
                                <option value="">Select Amount</option>
                                <option value="2000">2000</option>
                                <option value="5000">5000</option>
                                <option value="10000">10,000</option>
                                <option value="Other">Other</option>
                            </select>

                            {formData.stipendAmountOption === "Other" && (
                                <input
                                    type="text"
                                    name="stipendAmountCustom"
                                    value={formData.stipendAmountCustom}
                                    onChange={handleChange}
                                    placeholder="Enter Custom Amount"
                                    className="w-full p-3 mb-4 bg-gray-200 rounded-lg"
                                    required
                                />
                            )}
                        </>
                    )}
 
                    <button
                        type="submit"
                        className="w-full bg-[#faffa4] text-black py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#faffa4]-700"
                    >
                        Submit Application
                    </button>
                </form>
            </>
                )}
                </div>
            <Footer />
        </>
    );
};

export default CareerForm;
