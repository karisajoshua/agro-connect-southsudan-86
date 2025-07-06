
interface BannerAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const BannerAd = ({ 
  text = "ORGANIC FARMING SOLUTIONS", 
  bgColor = "bg-gradient-to-r from-green-700 to-yellow-600",
  className = "" 
}: BannerAdProps) => {
  return (
    <div className={`${bgColor} rounded-lg w-full max-w-[728px] h-[90px] flex items-center justify-center text-white font-bold text-xl text-center p-4 hover:shadow-xl transition-all cursor-pointer shadow-md mx-auto ${className}`}>
      <div>
        {text}
        <span className="text-sm font-normal ml-3 opacity-90">→ Discover More</span>
      </div>
    </div>
  );
};

export default BannerAd;
