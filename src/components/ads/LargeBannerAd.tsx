
interface LargeBannerAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const LargeBannerAd = ({ 
  text = "PREMIUM AGRICULTURAL MACHINERY & EQUIPMENT", 
  bgColor = "bg-gradient-to-r from-green-800 via-green-600 to-green-800",
  className = "" 
}: LargeBannerAdProps) => {
  return (
    <div className={`${bgColor} rounded-lg w-full max-w-[970px] h-[250px] flex items-center justify-center text-white font-bold text-2xl text-center p-8 hover:shadow-2xl transition-all cursor-pointer shadow-lg mx-auto ${className}`}>
      <div>
        <div>{text}</div>
        <div className="text-lg font-normal mt-4 opacity-90">
          Boost Your Farm Productivity Today
        </div>
        <div className="text-sm mt-2 opacity-80">Click for Special Offers →</div>
      </div>
    </div>
  );
};

export default LargeBannerAd;
