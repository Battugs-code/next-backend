import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { MovieQuery } from "./movies/graphql/query";
import { MovieMutation } from "./movies/graphql/mutation";
import {
  MovieMutationSchema,
  MovieQuerySchema,
  MovieSchema,
} from "./movies/graphql/schema";
import {
  CommentsMutationSchema,
  CommentsQuerySchema,
  CommentsSchema,
} from "./comments/graphql/schema";
import { CommentsQuery } from "./comments/graphql/query";
import { CommentsMutation } from "./comments/graphql/mutation";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

${MovieSchema}  ${CommentsSchema}

  type Query {
${MovieQuerySchema}
${CommentsQuerySchema}
  }

  type Mutation {
 ${MovieMutationSchema}
${CommentsMutationSchema}
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    ...MovieQuery,
    ...CommentsQuery,
  },
  Mutation: {
    ...MovieMutation,
    ...CommentsMutation,
  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

mongoose
  .connect(
    "mongodb+srv://fqtugs19_db_user:bywdCW1otOgnoKuK@backend-lesson.hs8srsx.mongodb.net/sample_mflix?appName=backend-lesson",
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
