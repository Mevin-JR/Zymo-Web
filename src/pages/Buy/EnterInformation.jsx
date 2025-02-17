import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export default function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhar: '',
    address: '',
    city: '',
    pincode: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.aadhar) {
      newErrors.aadhar = 'Aadhar is required';
    } else if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/buy/upload-doc');
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
            onClick={() => navigate(-1)}
            className="absolute left-1 md:left-5 top-10 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all "
            >
            <ArrowLeft size={30} />
        </button>

        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Extended Test Drive Booking
            </h1>
        </div>
        

        <div className="bg-[#212121]  md:bg-[#2A2A2A] md:p-8 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        Name (as on Driving License)
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                        placeholder="Enter your Name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                        placeholder="Enter your Email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                    placeholder="Enter your Phone Number"
                    maxLength={10}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium">
                    Aadhaar Number
                </label>
                <input
                    type="text"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white  focus:outline-none transition-colors"
                    placeholder="Enter your Aadhaar Number"
                    maxLength={12}
                />
                {errors.aadhar && (
                    <p className="text-red-500 text-sm">{errors.aadhar}</p>
                )}
                </div>

                <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">
                    Street Address
                </label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white  focus:outline-none transition-colors"
                    placeholder="Enter your Street Address"
                />
                {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                )}
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                    placeholder="Enter your City Name"
                />
                {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                )}
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium">Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                    placeholder="Enter your Pincode"
                    maxLength={6}
                />
                {errors.pincode && (
                    <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium">Date of Birth</label>
                <div className="relative">
                    <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#424242] text-white focus:outline-none transition-colors"
                    />
                </div>
                {errors.dob && (
                    <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
                </div>
            </div>

          <div className="mt-8">
            <button
                onClick={handleNext}
                className="w-full p-4 rounded-lg font-semibold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-appColor text-black"
                >
                Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
