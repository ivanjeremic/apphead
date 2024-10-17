import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function About() {
  return <h1>About</h1>;
}
