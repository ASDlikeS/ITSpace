import { useState } from "react";
import { ModalWindow } from "./ModalWindow";
import { MyInput } from "../../../components/UI/MyInput";
import { MySpan } from "../../../components/UI/MySpan";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

export const MainHeader: React.FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex flex-col justify-between items-center text-lg p-4 h-100 mb-20 bg-gif-banner'>
      {isAuth ? (
        <nav className='flex justify-around items-center w-full'>
          <MySpan onClick={toggleMenu}>Create Post</MySpan>
          <MySpan onClick={() => navigate("profile")}>Profile</MySpan>
          <MySpan onClick={() => navigate("my_posts")}>My Posts</MySpan>
        </nav>
      ) : (
        <nav className='flex justify-end w-full'>
          <MySpan onClick={() => navigate("authorization")}>Sign in</MySpan>
        </nav>
      )}
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
