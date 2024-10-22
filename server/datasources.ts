import {
  AddBookMutationResponse,
  AddLibraryMutationResponse,
  Book,
  Library,
} from "../__generated__/resolvers-types";

const BooksDB: Omit<Required<Book>, "__typename" | "library">[] = [
  {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: "2",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
  {
    id: "7",
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    id: "8",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    id: "9",
    title: "Animal Farm",
    author: "George Orwell",
  },
  {
    id: "10",
    title: "Moby Dick",
    author: "Herman Melville",
  },
];

export class BooksDataSource {
  getBooks(): Book[] {
    return BooksDB.map((book) => ({
      ...book,
      library: LibrariesDB.find((l) => l.bookIDs.includes(book.id)),
    }));
  }

  getBook(id: string): Book | null {
    const book = BooksDB.find((book) => book.id === id);
    return {
      ...book,
      library: LibrariesDB.find((lib) => lib.bookIDs.includes(book.id)),
    };
  }

  async addBook(book: Omit<Book, "id">): Promise<AddBookMutationResponse> {
    if (book.title && book.author) {
      const lastID = BooksDB.pop().id;
      const id = (Number.parseInt(lastID) + 1).toString();
      BooksDB.push({
        title: book.title,
        author: book.author,
        id,
      });

      return {
        code: "200",
        success: true,
        message: "New book added!",
        book: {
          ...book,
          id,
        },
      };
    }

    return {
      code: "400",
      success: false,
      message: "Invalid input",
      book: null,
    };
  }
}

const LibrariesDB: (Omit<Required<Library>, "__typename" | "books"> & {
  bookIDs: string[];
})[] = [
  {
    id: "1",
    name: "New York Public Library",
    address: "476 5th Ave, New York, NY 10018, USA",
    bookIDs: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "British Library",
    address: "96 Euston Rd, London NW1 2DB, UK",
    bookIDs: ["4", "5", "6"],
  },
  {
    id: "3",
    name: "Library of Congress",
    address: "101 Independence Ave SE, Washington, DC 20540, USA",
    bookIDs: ["7", "8", "9"],
  },
  {
    id: "4",
    name: "Bibliothèque nationale de France",
    address: "Quai François Mauriac, 75706 Paris, France",
    bookIDs: ["10"],
  },
];

export class LibrariesDataSource {
  getLibraries(): Library[] {
    return LibrariesDB.map((library) => {
      const books = BooksDB.filter((book) => library.bookIDs.includes(book.id));

      return {
        ...library,
        books,
      };
    });
  }

  getLibrary(id: string): Library | null {
    const library = LibrariesDB.find((library) => library.id === id);
    return {
      ...library,
      books: BooksDB.filter((book) => library.bookIDs.includes(book.id)),
    };
  }

  async addLibrary(
    library: Omit<Library, "id">
  ): Promise<AddLibraryMutationResponse> {
    if (library.name && library.address) {
      const newLibrary = {
        id: String(LibrariesDB.length + 1),
        name: library.name,
        address: library.address,
        bookIDs: [],
      };

      LibrariesDB.push(newLibrary);

      return {
        code: "200",
        success: true,
        message: "New library added!",
        library: {
          ...newLibrary,
          books: [],
        },
      };
    }

    return {
      code: "400",
      success: false,
      message: "Invalid input",
      library: null,
    };
  }
}
