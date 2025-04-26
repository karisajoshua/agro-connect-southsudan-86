
interface AdvertSpaceProps {
  text?: string;
  className?: string;
}

const AdvertSpace = ({ text = "ADVERT SPACE", className = "" }: AdvertSpaceProps) => {
  return (
    <div className={`advert-space ${className}`}>
      {text}
    </div>
  );
};

export default AdvertSpace;
