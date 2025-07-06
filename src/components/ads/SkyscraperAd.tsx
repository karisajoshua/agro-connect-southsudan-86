
interface SkyscraperAdProps {
  text?: string;
  bgColor?: string;
  className?: string;
}

const SkyscraperAd = ({ 
  text = "AGRICULTURAL CONSULTANCY", 
  bgColor = "bg-gradient-to-b from-slate-600 to-blue-700",
  className = "" 
}: SkyscraperAdProps) => {
  return (
    <div className={`${bgColor} rounded-lg w-[160px] h-[600px] flex items-center justify-center text-white font-bold text-center p-4 hover:scale-105 transition-all cursor-pointer shadow-lg ${className}`}>
      <div className="transform -rotate-90 whitespace-nowrap">
        <div className="text-lg">{text}</div>
        <div className="text-xs font-normal mt-2 opacity-90">Expert Advice</div>
      </div>
    </div>
  );
};

export default SkyscraperAd;
