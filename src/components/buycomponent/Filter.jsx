import React, { useState } from 'react'

const CarType = ["Automatic", "Hybrid", "Electric"];
const Filter = ({setFilterCar }) => {
  const [selectedFilter, setSelectedFilter] = useState("Electric");

  // Function to handle the filter button click
  const handleFilterClick = (filter) => {
    setFilterCar(filter);
    setSelectedFilter(filter);
  };
  return (
    <>
      <div className="filter-container text-md flex justify-center my-3 mx-3 gap-2">
        {CarType.map((typ, index) =>
          <button type="button"
          className={`p-2 px-5 rounded-2xl gap-1 transition-all ${
            selectedFilter === typ
              ? 'bg-white text-darkGrey'  // Selected filter color
              : 'bg-darkGrey2 text-white'  // Unselected filter color
          }`}
           key={index}
           onClick={()=> handleFilterClick(typ)}>{typ}</button>
        )}
      </div>

    </>
  )
}

export default Filter
