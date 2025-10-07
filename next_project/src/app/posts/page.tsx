import PostsList from "../../components/PostsList/PostsList";
import Api from "@/api/api";

const PostsPage = async () => {
  const posts = await Api.getPosts();

  return (
    <div className="page-wrapper">
      <h1>Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
};

export default PostsPage;
