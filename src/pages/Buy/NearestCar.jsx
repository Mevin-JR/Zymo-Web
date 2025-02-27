import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/buycomponent/Filter";
import Cards from "../../components/buycomponent/Cards";
import SearchBar from "../../components/buycomponent/SearchBar";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { ArrowLeft } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { webDB } from "../../utils/firebase";

const NearestCar = () => {
  const navigate = useNavigate();

  const [filteredCars, setFilteredCars] = useState("Electric");
  const [allCars, setAllCars] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchResults,setSearchResults]=useState(allCars)

  // Fetch all cars initially and store them in state
  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const carsCollectionRef = collection(webDB, "BuySectionCars");
        const querySnapshot = await getDocs(carsCollectionRef);

        const cars = querySnapshot.docs.map((doc) => doc.data());
        setAllCars(cars); 
      
        setFilteredData(cars.filter((car) => car.type === "Electric"));
      } catch (err) {
        console.error("Error fetching cars data:", err);
      }
    };

    fetchCarsData();
  }, []);

  useEffect(() => {
    if (filteredCars) {
      const filtered = allCars.filter((car) => car.type === filteredCars);
      setSearchResults(filtered); 
    }
  }, [filteredCars, allCars]); 

  return (
    <>
      <NavBar />
      <div className="head-container flex flex-col sm:flex-row justify-between items-center bg-darkGrey text-white p-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all"
        >
          <ArrowLeft size={28} />
        </button>

        <h1 className="text-white text-3xl font-bold pl-5">Nearest Car</h1>

        <div className="mt-3 sm:mt-0 sm:ml-4 flex justify-end w-full sm:w-auto">
          <SearchBar setSearchResults={setSearchResults} />
        </div>
      </div>
      <Filter setFilterCar={setFilteredCars} /> {/* Pass setter function */}
      <Cards cars={filteredData} />
      <Footer />
    </>
  );
};

export default NearestCar;
