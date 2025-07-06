
interface SmallSquareAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const SmallSquareAd = ({ 
  text = "ADVERTISE HERE", 
  bgColor = "bg-agro-orange",
  className = "" 
}: SmallSquareAdProps) => {
  return (
    <div className={`${bgColor} bg-opacity-80 rounded-md w-32 h-32 flex items-center justify-center text-white font-bold text-sm text-center p-2 hover:bg-opacity-90 transition-all cursor-pointer shadow-md ${className}`}>
      {text}
    </div>
  );
};

export default SmallSquareAd;
