import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow";
import { MyInput } from "../UI/MyInput";
import { MySpan } from "../UI/MySpan";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex flex-col justify-between items-center text-lg p-4 h-100 mb-20 bg-gif-banner'>
      <nav className='flex justify-around items-center w-full'>
        <MySpan onClick={toggleMenu}>Create Post</MySpan>
        <MySpan>Profile</MySpan>
        <MySpan>My Posts</MySpan>
      </nav>
      <div className='mt-15 flex flex-col bg-white rounded-3xl shadow-lg p-10 w-full max-w-4xl mx-auto'>
        <h1 className='font-sans lg:text-7xl text-5xl text-center mb-10'>
          ITSpace
        </h1>
        <p className='text-center font-light text-2xl text-gray-600 mb-10'>
          Learn how to grow your it skills with our expert community.
        </p>
        <MyInput placeholder="Let's find your post today..." />
      </div>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
