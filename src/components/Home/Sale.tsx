import { Link } from "react-router-dom";
import leftModel from "@/assets/images/left_model.png";
import rightModel from "@/assets/images/right_model.png";
import ShinyText from "../ui/ShinyText";

export default function Sale() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-5 md:mt-10">
      {/* Left Model */}
      <div className="hidden lg:block w-full max-w-sm lg:max-w-md">
        <img
          src={leftModel}
          alt="Left Model"
          className="w-full h-auto object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Sale Banner */}
      <div className="relative w-full max-w-lg text-center bg-green-600 text-white p-8 rounded-xl shadow-lg">
        {/* Top Phrase */}
        <div className="w-full bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 py-3 lg:py-5 rounded-lg shadow-md">
          <h4 className="text-sm sm:text-xl md:text-2xl font-bold uppercase">
            Timeless Elegance
          </h4>
        </div>

        {/* Sale Text */}
        <h1 className="text-4xl lg:text-6xl font-bold mt-8 sm:mt-12 lg:mt-16">
          ULTIMATE
        </h1>
        <h2 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-sunset to-primary-default drop-shadow">
          SALE
        </h2>
        <p className="text-lg uppercase mt-2 tracking-wide text-white">
          New Collection
        </p>

        {/* Shop Now Button */}
        <Link
          to="/products"
          className="block w-fit mx-auto mt-6 px-6 py-3 bg-gray-800 text-white transition font-semibold rounded-lg shadow uppercase"
        >
          <ShinyText text="Shop Now" speed={4} />
        </Link>

        {/* Bottom Phrase */}
        <div className="w-full bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 py-3 lg:py-5 rounded-lg shadow-md mt-8 sm:mt-12 lg:mt-16">
          <h4 className="text-sm sm:text-xl md:text-2xl font-bold uppercase">
            Limited Time Offer!
          </h4>
        </div>
      </div>

      {/* Right Model */}
      <div className="hidden lg:block w-full max-w-sm lg:max-w-md">
        <img
          src={rightModel}
          alt="Right Model"
          className="w-full h-auto object-cover rounded-lg"
          loading="lazy"
        />
      </div>
    </section>
  );
}
