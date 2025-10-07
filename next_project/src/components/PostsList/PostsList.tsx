import { GetStaticProps, NextPage } from "next";
import { Space } from "antd";
import Api from "@/api/api";
import { Posts } from "@/models";
import Post from "../Post/Post";

interface PostsPageProps {
  posts: Posts;
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Space>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await Api.getPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

export default PostsPage;
