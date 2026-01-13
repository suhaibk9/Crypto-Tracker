import BannerImg from "../../assets/Banner.png";

const Banner = () => {
  return (
    <div className="w-full h-[20rem] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <img
        className="w-full h-full object-cover"
        src={BannerImg}
        alt="Banner"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1421]/60 via-transparent to-[#0d1421]"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Crypto <span className="text-purple-400">Tracker</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-md text-center">
          Real-time prices for the top cryptocurrencies
        </p>
      </div>
    </div>
  );
};

export default Banner;
