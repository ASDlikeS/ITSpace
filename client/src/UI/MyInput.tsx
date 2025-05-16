import type { TPropsInput } from "../types/TProps";

export const MyInput: React.FC<TPropsInput> = ({ classProps, ...props }) => {
  return (
    <input
      {...props}
      className='appearance-none text-2xl border-1 shadow-inner shadow-black border-black rounded-md h-13 align-middle pl-5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'
    ></input>
  );
};
