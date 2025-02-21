import React, { useState } from 'react'
import Filter from '../../components/buycomponent/Filter'
import Cards from '../../components/buycomponent/Cards'
import SearchBar from '../../components/buycomponent/SearchBar'
import {carData} from "../../api/NewCarData"
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NearestCar = () => {
   

    const [filteredCars, setFilteredCars] = useState("Electric");
   
    
    const [searchResults, setSearchResults] = useState(carData); // Holds search results

    // Filter cars based on both the search and filter
    const filteredData = searchResults.filter(car => car.type === filteredCars);


    // const handleSearch = (searchTerm) => {
    //     const results = carData.filter(car =>
    //         car.name.toLowerCase().includes(searchTerm.toLowerCase()) // Example search condition
    //     );
    //     setSearchResults(results);
    // };
    


    return (
        <>
        <NavBar/>

        <div className="head-container flex flex-col sm:flex-row justify-between items-center bg-darkGrey text-white p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all"
      >
        <ArrowLeft size={28} />
      </button>

      <h1 className="text-white text-3xl font-bold pl-5">Nearest Car</h1>

      {/* This div will wrap the SearchBar */}
      <div className="mt-3 sm:mt-0 sm:ml-4 flex justify-end w-full sm:w-auto">
        <SearchBar setSearchResults={setSearchResults} />
      </div>
    </div>


            <Filter setFilterCar={setFilteredCars} /> {/* Pass setter function */}
            <Cards cars={filteredData} /> 
            <Footer/>

        </>
    )
}

export default NearestCar
