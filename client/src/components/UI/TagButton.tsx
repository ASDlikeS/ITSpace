import { type TPropsButton } from "../types/TProps";

export const TagButton: React.FC<TPropsButton> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`w-25 h-8 bg-gray-200 rounded-full cursor-pointer text-gray-700 font-normal hover:bg-slate-200 text transition-all duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
