import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Book } from "../__generated__/resolvers-types";
import { BookQueryResponse } from "./types";

export function BookRoute() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  if (!id) {
    return <h1>No book found</h1>;
  }

  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    let ignore = false;
    const query = `
    query Book($id: ID!) {
      book(id: $id) {
        id
        title
        author
        library {
          id
          name
        }
      }
    }`;
    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables: { id } }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<BookQueryResponse>((res) => res.json())
      .then((res) => {
        if (ignore) return;
        setBook(res.data.book);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return book ? (
    <>
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      {book.library ? (
        <p>
          Available at{" "}
          <Link to={`/retrieve_library?id=${book.library.id}`}>
            {book.library.name}
          </Link>
        </p>
      ) : null}
    </>
  ) : null;
}
