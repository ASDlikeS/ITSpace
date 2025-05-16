import { PostList } from "./components/PostList";
import data from "../../data/posts.json";

export const Body: React.FC = () => {
  return (
    <div>
      <PostList posts={data} />
    </div>
  );
};
