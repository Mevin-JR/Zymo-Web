import React from 'react';
import Card from './Card';

const Cards = ({cars}) => {
    return (
        <>
        <div className="bg-darkGrey grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 py-6 my-3 rounded-lg mx-auto max-w-[1000px]">

            {cars.map((car) => (
                <Card key={car.id} car={car} />
            ))}
           </div>
           
        </>
    );
};

export default Cards;
