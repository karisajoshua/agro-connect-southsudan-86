
interface CompactSquareAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const CompactSquareAd = ({ 
  text = "PREMIUM ORGANIC PRODUCTS", 
  bgColor = "bg-gradient-to-br from-orange-600 to-red-600",
  className = "" 
}: CompactSquareAdProps) => {
  return (
    <div className={`${bgColor} rounded-lg w-[200px] h-[200px] flex items-center justify-center text-white font-bold text-center p-4 hover:scale-105 transition-all cursor-pointer shadow-lg ${className}`}>
      <div>
        <div className="text-lg">{text}</div>
        <div className="text-sm font-normal mt-3 opacity-90">Quality Guaranteed</div>
        <div className="text-xs mt-1 opacity-80">Shop Now</div>
      </div>
    </div>
  );
};

export default CompactSquareAd;
