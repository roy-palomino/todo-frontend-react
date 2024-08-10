import { FC } from "react";

import { Tag } from "../models";
import { cn } from "../utils/classNames";

interface Props extends Tag {}

const MyComponent: FC<Props> = (tag) => {
  return (
    <span
      className={cn(
        "rounded-xl px-3 py-[5px] font-semibold text-xs text-white bg-[#146175]",
        // "text-" + tag.text_color,
        // "bg-" + tag.background_color,
        // "border-" + tag.text_color,
      )}
    >
      {tag.name}
    </span>
  );
};

export default MyComponent;
