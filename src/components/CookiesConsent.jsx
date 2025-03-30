import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookiesConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!Cookies.get("cookiesConsent")) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookiesConsent", "true", { expires: 365 });
    setShowBanner(false);
  };

  const rejectCookies = () => {
    Cookies.set("cookiesConsent", "false", { expires: 365 });
    setShowBanner(false);
  };

  return (
    <div
      className={`fixed z-50 bottom-10 left-10 max-w-lg max-h-screen bg-[#303030] text-white p-4 ${
        showBanner ? "block" : "hidden"
      }`}
    >
      <h2 className="text-xl font-bold text-[#faffa4] mb-2">Cookies Consent</h2>
      <p>
        We use cookies to enhance your browsing experience, serve personalised
        ads or content, and analyse our traffic. By continuing to visit our
        site, you consent to our use of cookies.
      </p>
      <div className="flex flex-row gap-4 mt-5">
        <button
          onClick={acceptCookies}
          className="bg-[#faffa4] text-black px-4 py-2 hover:bg-[#f8fad2] hover:text-black/70 transition duration-300"
        >
          Accept
        </button>
        <button
          onClick={rejectCookies}
          className="bg-transparent border-2 border-[#faffa4] text-[#faffa4] px-4 py-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookiesConsent;
