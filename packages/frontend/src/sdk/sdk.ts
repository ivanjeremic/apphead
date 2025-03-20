import { ResultAsync, err, ok } from "neverthrow";
/**
 * @description fetch books
 * @returns
 */
export const fetchBooks = () =>
  ResultAsync.fromPromise(
    fetch("http://localhost:3001/api/books").then((res) => res.json()),
    (e) => new Error(`Fetch failed: ${e}`)
  );
