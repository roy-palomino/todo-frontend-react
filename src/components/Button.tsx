import { FC, ButtonHTMLAttributes } from "react";

import { cn } from "../utils/classNames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  rounded?: boolean,
}

const Button: FC<Props> = ({
  children,
  variant = "primary",
  onClick,
  rounded = false,
  ...props
}) => {
  const variants = {
    primary: "bg-slate-800 text-white",
    secondary: "bg-white text-slate-800",
  };

  return (
    <button
      onClick={onClick}
      type={props.type}
      className={cn(
        "font-semibold border border-slate-800 py-3 px-9 transition-all uppercase",
        variants[variant],
        props.className || "",
        rounded ? "rounded-full !px-3 shadow-lg z-30" : "rounded-lg",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
