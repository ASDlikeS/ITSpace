import { useEffect, useState } from "react";
import { type TModal } from "../../types/TProps";
import { type TPostSubmit } from "../../types/TPosts";

export const ModalWindow: React.FC<TModal> = ({ isOpen, setIsOpen }) => {
  const [post, setPost] = useState<TPostSubmit>({
    title: "",
    body: "",
    imageUrl: "",
    tags: [],
  });
  const [tag, setTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleTagSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTag = tag.trim();
    if (newTag && !post.tags?.includes(newTag)) {
      setPost((prev) => ({
        ...prev,
        tags: [...(prev.tags ?? []), newTag],
      }));
      setTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      <div
        className={`${
          !isOpen && "hidden"
        } fixed left-0  right-0 top-0 bottom-0 bg-opacity-10 flex justify-center items-center z-1 bg-gif-banner `}
        onClick={() => setIsOpen(false)}
      >
        <form
          className='bg-amber-50 flex flex-col w-11/12 min-h-1/2 rounded-2xl justify-center p-10 border-2 border-amber-200'
          method='post'
          onClick={(e) => e.stopPropagation()}
        >
          <label className='text-2xl font-bold text-gray-700' htmlFor='title'>
            Enter title
          </label>
          <input
            className='border-gray-500 self-center w-full pl-3 border-3 mt-5 mb-10 focus:bg-amber-200 transition-all duration-300 ease-in-out'
            type='text'
            name='title'
            value={post?.title}
            onChange={handleChange}
          />
          <label className='font-medium text-gray-700' htmlFor='url_img'>
            Image url
          </label>
          <input
            className='border-gray-500 border-3 self-center w-full mt-5 mb-10 pl-3 focus:bg-amber-200 transition-all duration-300 ease-in-out'
            type='text'
            name='url_img'
          />
          <div
            className={`flex ${post.tags?.length !== 0 && "mb-5"} flex-wrap`}
          >
            {post.tags?.map((tag, i) => (
              <div
                key={i}
                className='flex bg-amber-200 rounded-xl p-0.5 pr-3 pl-3 items-center mr-2 mb-2'
              >
                <h1 className='mr-1'>{tag}</h1>
                <button
                  className='cursor-pointer rounded-full bg-amber-50 w-5 h-5 flex justify-center items-center hover:bg-amber-400 transition-all duration-300 ease-in-out'
                  onClick={() => handleRemoveTag(tag)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className='flex justify-between items-end self-center w-full mb-8'>
            <div className='flex flex-col w-full'>
              <label className='font-medium text-gray-700' htmlFor='tags'>
                Enter tags
              </label>
              <input
                className='border-gray-500 border-3 w-3/4 mt-5 pl-3 focus:bg-amber-200 transition-all duration-300 ease-in-out'
                type='text'
                name='tags'
                value={tag}
                onChange={handleTagInput}
              />
            </div>
            <button
              onClick={handleTagSubmit}
              className='h-8 w-20 rounded-lg border-2 border-gray-700 cursor-pointer hover:bg-amber-200 transition-all duration-300 ease-in-out'
            >
              Add
            </button>
          </div>
          <textarea
            name='body'
            placeholder='Today, I decided to start blogging!'
            className='self-center w-full border-gray-700 border-5 resize-none h-25 pl-2 focus:bg-amber-200'
            value={post?.body}
            onChange={handleChange}
          />
          <button className='h-10 mt-5 w-full rounded-lg border-2 border-gray-700 cursor-pointer hover:bg-amber-200 transition-all duration-300 ease-in-out'>
            Create
          </button>
        </form>
      </div>
    </>
  );
};
