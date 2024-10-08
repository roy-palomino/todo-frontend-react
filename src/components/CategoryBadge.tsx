import { FC } from "react";
import { Category } from "../models";

interface Props {
  category?: Category;
}

const CategoryBadge: FC<Props> = ({ category }) => {
  if (category)
    return (
      <span className="absolute right-3 bg-secondary-1 font-thin md:font-normal text-white -top-1.5 px-4 py-0.5 rounded-md">
        {category.name}
      </span>
    );
};

export default CategoryBadge;
