import { type TPropsButton } from "../../types/TProps";

export const DeletePostButton: React.FC<TPropsButton> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${className} transition-all duration-300 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
};
