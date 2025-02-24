const PaymentConfirmationPage = ({ isOpen, close }) => {

  // console.log("Confirm page");
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-darkGrey2 rounded-lg shadow-lg p-6 w-80 text-center">
            <div className="font-bold w-16 h-16 bg-[#faffa4] rounded-full flex items-center justify-center mx-auto text-darkGrey2">
              {/* Loading Spinner */}
              <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#faffa4] w-8 h-8"></div>
            </div>
            <h2 className="text-xl font-bold mt-4 text-white">Checking your payment...</h2>
            <p className="text-white mt-2">Please wait while we confirm your payment status.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentConfirmationPage;
