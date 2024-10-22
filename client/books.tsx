import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../__generated__/resolvers-types";
import { BooksQueryResponse } from "./types";

export function BooksRoute() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    let ignore = false;
    const query = `
    query Books {
      books {
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
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<BooksQueryResponse>((res) => res.json())
      .then((res) => {
        if (ignore) return;
        setBooks(res.data.books);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <h2>Books</h2>
      <p>Here are some books:</p>
      <ul>
        {books.map((book) => (
          <li key={book.title}>
            <Link to={`/retrieve_book?id=${book.id}`}>
              <strong>{book.title}</strong> by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
