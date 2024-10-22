import { QueryResolvers } from "../../__generated__/resolvers-types";

export const queries: QueryResolvers = {
  books: async (_, __, { dataSources }) => {
    return dataSources.booksAPI.getBooks();
  },
  book: async (_, { id }, { dataSources }) => {
    return dataSources.booksAPI.getBook(id);
  },
  libraries: async (_, __, { dataSources }) => {
    return dataSources.librariesAPI.getLibraries();
  },
  library: async (_, { id }, { dataSources }) => {
    return dataSources.librariesAPI.getLibrary(id);
  },
};
