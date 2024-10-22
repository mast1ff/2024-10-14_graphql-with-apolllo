import { MutationResolvers } from "../../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  addBook: async (_, { title, author }, { dataSources }) => {
    return dataSources.booksAPI.addBook({ title, author });
  },
  addLibrary: async (_, { name, address }, { dataSources }) => {
    return dataSources.librariesAPI.addLibrary({ name, address });
  },
};

export default mutations;
