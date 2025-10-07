import { GetStaticProps, NextPage } from "next";
import { Space } from "antd";
import Api from "@/api/api";
import { Todos } from "@/models";
import Todo from "../Todo/Todo";

interface TodosPageProps {
  todos: Todos;
}

const TodosList: NextPage<TodosPageProps> = ({ todos }) => {
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </Space>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const todos = await Api.getTodos();
  return {
    props: { todos },
    revalidate: 60,
  };
};

export default TodosList;
