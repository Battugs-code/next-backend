export const MovieSchema = `#graphql

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

`;
export const MovieQuerySchema = `#graphql

    movie(genre: String, page: Int, _id: ID): [Movie]
    movies(title:String,page: Int!): [Movie]

`;
export const MovieMutationSchema = `#graphql

    addMovie(title: String!, genres: [String], year: Int!): Movie

`;
