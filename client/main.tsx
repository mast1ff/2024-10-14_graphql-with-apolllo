import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { BooksRoute } from "./books";
import { BookRoute } from "./book";
import { LibrariesRoute } from "./libraries";
import { LibraryRoute } from "./library";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <h1>Welcome to the library!</h1>
        <Outlet />
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="/list_books">Books</Link>
          <Link to="/list_libraries">Libraries</Link>
        </nav>
      </>
    ),
    children: [
      {
        path: "/list_books",
        element: <BooksRoute />,
      },
      {
        path: "/retrieve_book",
        element: <BookRoute />,
      },
      {
        path: "/list_libraries",
        element: <LibrariesRoute />,
      },
      {
        path: "/retrieve_library",
        element: <LibraryRoute />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
