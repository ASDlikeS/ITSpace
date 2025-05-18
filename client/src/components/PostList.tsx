import { Post } from "./Post";
import { useState } from "react";
import data from "../../data/posts.json";

export const PostList: React.FC = () => {
  const [localPosts, setLocalPosts] = useState(data);

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
