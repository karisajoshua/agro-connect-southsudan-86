
interface MediumRectangleAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const MediumRectangleAd = ({ 
  text = "PREMIUM EQUIPMENT", 
  bgColor = "bg-gradient-to-br from-blue-600 to-orange-500",
  className = "" 
}: MediumRectangleAdProps) => {
  return (
    <div className={`${bgColor} rounded-lg w-full max-w-[300px] h-[250px] flex items-center justify-center text-white font-bold text-lg text-center p-4 hover:scale-105 transition-all cursor-pointer shadow-lg ${className}`}>
      <div>
        {text}
        <div className="text-sm font-normal mt-2 opacity-90">Click to Learn More</div>
      </div>
    </div>
  );
};

export default MediumRectangleAd;
