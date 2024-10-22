import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { Resolvers } from "../__generated__/resolvers-types";
import * as fs from "node:fs";
import { BooksDataSource, LibrariesDataSource } from "./datasources";
import { queries } from "./resolvers/queries";
import mutations from "./resolvers/mutations";

const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
    librariesAPI: LibrariesDataSource;
  };
}

const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
};

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        booksAPI: new BooksDataSource(),
        librariesAPI: new LibrariesDataSource(),
      },
    };
  },
});

console.log(`Server ready at: ${url}`);
