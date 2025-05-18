import { format } from "date-fns";
import { type TPropsPost } from "../types/TProps";
import { TagButton } from "../components/UI/TagButton";
import { DeletePostButton } from "../components/UI/DeletePostButton";

export const Post: React.FC<TPropsPost> = ({ post, onClick }) => {
  const rawDate = post.date;
  const date = new Date(rawDate);
  const formattedDate = format(date, "MMM d, yyyy");

  return (
    <div className='flex flex-col justify-between mb-30 w-full lg:min-h-190 lg:w-150'>
      <div>
        <img
          className='w-full aspect-video rounded-3xl object-cover relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-2'
          src={post.imageUrl}
          alt='post image'
        />
        <div className='flex flex-col lg:flex-row lg:items-center mt-7'>
          <p className='lg:mr-5 text-gray-600 font-normal'>{formattedDate}</p>
          <div>
            {post.tags?.map((tag, index) => (
              <TagButton key={index} className='mr-2 mt-3 lg:mt-0'>
                {tag}
              </TagButton>
            ))}
          </div>
        </div>
        <div className='mt-3'>
          <h2 className='text-2xl font-semibold mb-3'>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      </div>
      <div>
        <hr className='text-blue-500 mt-10' />
        <div className='flex items-center mt-10'>
          {post.avatarUrl ? (
            <img
              className='rounded-full object-cover w-10 h-10 mr-4'
              src={post.avatarUrl}
              alt='avatar'
            />
          ) : (
            <div className='flex justify-center items-center rounded-full h-10 w-10 bg-amber-700 mr-4'>
              <h1 className='text-lg'>{post.author[0]}</h1>
            </div>
          )}
          <div className='flex-col'>
            <p className='font-bold'>{post.author}</p>
            <p className='text-gray-600'>{post.job}</p>
          </div>
        </div>
        <DeletePostButton className='mt-5 w-full' onClick={onClick}>
          Delete
        </DeletePostButton>
      </div>
    </div>
  );
};
