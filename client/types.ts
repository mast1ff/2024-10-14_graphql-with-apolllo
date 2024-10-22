import { Book, Library } from "../__generated__/resolvers-types";

export type QueryResponse<T> = {
  data: T;
};

export type BooksQueryResponse = QueryResponse<{ books: Book[] }>;

export type BookQueryResponse = QueryResponse<{ book: Book }>;

export type LibrariesQueryResponse = QueryResponse<{ libraries: Library[] }>;

export type LibraryQueryResponse = QueryResponse<{ library: Library }>;
