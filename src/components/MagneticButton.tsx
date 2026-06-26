import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "teal" | "ghost" | "ghost-light" | "ghost-teal";
  children: ReactNode;
}

const MagneticButton = ({ variant = "teal", children, className = "", ...rest }: Props) => {
  const variants = {
    teal: "btn-teal",
    ghost: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent",
    "ghost-light": "btn-ghost-light",
    "ghost-teal": "border border-accent text-accent hover:bg-accent hover:text-primary bg-transparent transition-colors duration-300",
  } as const;

  return (
    <button
      className={`btn-magnetic ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
