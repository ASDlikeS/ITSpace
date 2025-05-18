import { type TPropsSpan } from "../../types/TProps";

export const MySpan: React.FC<TPropsSpan> = ({ children, onClick }) => {
  return (
    <div>
      <span
        className='cursor-pointer text-white font-medium shadow-inner shadow-white flex justify-center items-center rounded-full border-white border-1 p-2 w-30 hover:bg-amber-50 hover:text-black transition-all duration-300 ease-in-out'
        onClick={onClick}
      >
        {children}
      </span>
    </div>
  );
};
//
