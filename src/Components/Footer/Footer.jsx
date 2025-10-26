import { Link } from "react-router-dom";
import amazon from "../../assets/images/amazon-pay.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import appGoogle from "../../assets/images/get-apple-store.png";

function ShareApp() {
  window.open(location.origin);
}

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-50 py-10 mt-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Title & Description */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Get Fresh Cart App
            </h2>
            <p className="text-gray-600 text-sm md:text-base opacity-80">
              We will send you a download link — open it and download the app.
            </p>
          </div>

          {/* Input & Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={ShareApp}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 transition text-white font-medium py-2 px-5 rounded-md"
            >
              Share App Link
            </button>
          </div>

          {/* Payment & App Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center flex-wrap">
              <span className="font-semibold text-gray-700">
                Payment Methods:
              </span>
              <div className="flex gap-3 items-center">
                <img src={mastercard} className="w-14 sm:w-16" alt="MasterCard" />
                <img src={paypal} className="w-14 sm:w-16" alt="PayPal" />
                <img src={amazon} className="w-14 sm:w-16" alt="Amazon Pay" />
              </div>
            </div>

            {/* App Download */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <span className="font-semibold text-gray-700">
                Get App Now On:
              </span>
              <Link
                to="https://play.google.com/store/games?hl=en&pli=1"
                target="_blank"
              >
                <img
                  src={appGoogle}
                  className="w-28 sm:w-32 object-contain"
                  alt="Get App"
                />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300" />

          {/* Footer Bottom */}
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Fresh Cart — All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
