
import { Link } from "react-router-dom";

interface CategoryCircleProps {
  name: string;
  link: string;
}

const CategoryCircle = ({ name, link }: CategoryCircleProps) => {
  return (
    <Link to={link}>
      <div className="category-circle">
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default CategoryCircle;
