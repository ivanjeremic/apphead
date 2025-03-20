import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../sdk/sdk";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const query = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>{JSON.stringify(query?.data)}</pre>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack with Ivan
        </a>
      </header>
    </div>
  );
}
