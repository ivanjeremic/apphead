import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DomebaseClient } from "@domebase/js-sdk";
import { useEffect } from "react";
import { fetchBooks } from "../sdk/sdk";
import logo from "../logo.svg";
import "../App.css";

const db = new DomebaseClient();

db.user = "myuser";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const query = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  useEffect(() => {
    (async () => {
      await db.createCollection("flowers", [
        { field: "make", index: 1, type: "string" },
        { field: "model", index: 2, type: "string" },
        { field: "year", index: 3, type: "int32" },
      ]);

      await db.insert({
        collection: "flowers",
        data: { make: "ford", model: "f150", year: 2021 },
      });
    })();
  }, []);

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
