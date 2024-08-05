import { FC } from "react";

import { Tag } from "../models";
import { cn } from "../utils/classNames";

interface Props extends Tag {}

const MyComponent: FC<Props> = (tag) => {
  return (
    <span
      className={cn(
        "border rounded-md px-3 py-1 font-semibold text-xs border-opacity-15 shadow-sm text-opacity-70",
        "text-" + tag.text_color,
        "bg-" + tag.background_color,
        "border-" + tag.text_color,
      )}
    >
      {tag.name}
    </span>
  );
};

export default MyComponent;
