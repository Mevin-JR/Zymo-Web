const LoadingCard = () => {
    return (
      <div className="flex flex-col md:flex-row bg-[#303030] border border-gray-500 rounded-2xl p-4 py-1 text-white mx-auto w-full max-w-[900px] min-h-[300px] md:items-center animate-pulse">
        {/* Left Section: Car Details (Skeleton) */}
        <div className="flex md:flex-col justify-between w-full md:w-1/3 text-center md:text-left gap-8">
          <div>
            <div className="h-6 w-32 bg-gray-500 rounded-md mb-2"></div>
            <div className="h-5 w-20 bg-gray-500 rounded-md"></div>
          </div>
          <div className="mt-2">
            <div className="h-4 w-16 bg-gray-500 rounded-md mb-2"></div>
            <div className="h-4 w-24 bg-gray-500 rounded-md mb-1"></div>
            <div className="h-4 w-20 bg-gray-500 rounded-md"></div>
          </div>
        </div>
  
        {/* Center Section: Image Placeholder */}
        <div className="relative flex items-center justify-center rounded-xl p-1 w-full md:w-auto mt-4 md:mt-0">
          <div className="h-40 w-60 bg-gray-500 rounded-xl"></div>
        </div>
  
        {/* Right Section: Price & CTA (Skeleton) */}
        <div className="flex md:flex-col items-center md:items-end text-center md:text-right justify-between w-full md:w-1/3 mt-4 md:mt-0 gap-8">
          <div>
            <div className="h-6 w-32 bg-gray-500 rounded-md"></div>
            <div className="h-4 w-20 bg-gray-500 rounded-md mt-1"></div>
            <div className="h-3 w-24 bg-gray-500 rounded-md mt-2"></div>
          </div>
          <div className="w-20 h-10 bg-gray-500 rounded-lg"></div>
        </div>
      </div>
    );
  };
export default LoadingCard;