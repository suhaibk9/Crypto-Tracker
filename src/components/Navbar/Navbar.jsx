import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import store from "../../state/store";

const Navbar = () => {
  const currency = store((state) => state.currency);
  const setCurrency = store((state) => state.setCurrency);
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-[#0d1421] border-b border-gray-800 px-6">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          Crypto Tracker
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="relative">
            <details ref={detailsRef}>
              <summary className="text-white cursor-pointer">
                {currency.toUpperCase()}
              </summary>
              <ul className="bg-[#1a2332] rounded-lg p-2 w-40 z-[1000] shadow-lg absolute right-0 mt-2 border border-gray-700">
                <li
                  className={`rounded ${
                    currency === "usd" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleCurrencyChange("usd");
                    }}
                    className="text-white"
                  >
                    USD ($)
                  </a>
                </li>
                <li
                  className={`rounded ${
                    currency === "gbp" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleCurrencyChange("gbp");
                    }}
                    className="text-white"
                  >
                    GBP (£)
                  </a>
                </li>
                <li
                  className={`rounded ${
                    currency === "inr" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleCurrencyChange("inr");
                    }}
                    className="text-white"
                  >
                    INR (₹)
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
