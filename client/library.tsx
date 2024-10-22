import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Library } from "../__generated__/resolvers-types";
import { LibraryQueryResponse } from "./types";

export function LibraryRoute() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  if (!id) {
    return <h1>No library found</h1>;
  }

  const [library, setLibrary] = useState<Library | null>(null);
  useEffect(() => {
    let ignore = false;
    const query = `
    query Library($id: ID!) {
      library(id: $id) {
        id
        name
        address
        books {
          id
          title
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
      .then<LibraryQueryResponse>((res) => res.json())
      .then((res) => {
        if (ignore) return;
        setLibrary(res.data.library);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return library ? (
    <>
      <h2>{library.name}</h2>
      <p>Located at {library.address}</p>
      <h3>Books</h3>
      <ul>
        {library.books?.map((book) => (
          <li key={book.title}>
            <Link to={`/retrieve_book?id=${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </>
  ) : null;
}
