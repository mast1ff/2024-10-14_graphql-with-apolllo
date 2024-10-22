import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LibrariesQueryResponse } from "./types";
import { Library } from "../__generated__/resolvers-types";

export function LibrariesRoute() {
  const [libraries, setLibraries] = useState<Library[]>([]);

  useEffect(() => {
    let ignore = false;
    const query = `
    query Libraries {
      libraries {
        id
        name
        address
      }
    }`;
    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<LibrariesQueryResponse>((res) => res.json())
      .then((res) => {
        if (ignore) return;
        setLibraries(res.data.libraries);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <h2>Libraries</h2>
      <p>Here are some libraries:</p>
      <ul>
        {libraries.map((library) => (
          <li key={library.name}>
            <Link to={`/retrieve_library?id=${library.id}`}>
              <strong>{library.name}</strong> at {library.address}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
