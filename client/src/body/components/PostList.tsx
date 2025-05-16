import { Post } from "./Post";
import { type TPropsPosts } from "../../types/TProps";
import { useState } from "react";

export const PostList: React.FC<TPropsPosts> = ({ posts }) => {
  const [localPosts, setLocalPosts] = useState(posts);

  const handleDelete = (id: string) => {
    const newPosts = localPosts.filter((post) => post.id !== id);
    setLocalPosts(newPosts);
  };
  return (
    <div className='p-5 flex justify-around flex-col lg:flex-row lg:items-start flex-wrap'>
      {localPosts.map((post) => (
        <Post
          key={post.id}
          onClick={() => handleDelete(post.id)}
          post={post}
        ></Post>
      ))}
    </div>
  );
};
