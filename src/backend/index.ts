import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { Movies } from "../backend/model";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Imdb {
    rating: Float
    votes: Int
  }

  type Movie {
    _id: ID
    title: String
    genres: [String]
    imdb: Imdb
    year: Int
    poster: String
    runtime: Int
    directors: [String]
    plot: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movie(genre: String, page: Int, _id: ID): [Movie]
    movies(title:String,page: Int!): [Movie]
  }

  type Mutation {
    addMovie(title: String!, genres: [String], year: Int!): Movie
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: async (
      _root: any,
      { title, page }: { title: string; page: number },
    ) => {
      const perPage = 20;

      if (title) {
        return Movies.find({ title }).limit(perPage);
      }

      return Movies.find().limit(perPage);
    },
    movie: async (
      _root: any,
      { genre, page, _id }: { genre: string; page: number; _id: string },
    ) => {
      const perPage = 20;

      if (genre) {
        return Movies.find({ genres: genre }).limit(perPage);
      }

      if (_id) {
        return Movies.find({ _id }).limit(perPage);
      }

      return Movies.find().limit(perPage);
    },
  },
  Mutation: {
    addMovie: async (
      _root: any,
      {
        title,
        genres,
        year,
      }: { title: string; genres: string[]; year: number },
    ) => {
      const movie = new Movies({
        title,
        genres,
        year,
      });
      return movie.save();
    },
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
