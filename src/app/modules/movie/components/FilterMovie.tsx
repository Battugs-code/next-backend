"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_FILTER_MOVIE = gql`
  query Movies($genre: String!, $page: Int!) {
    movie(genre: $genre, page: $page) {
      _id
      title
      year
      imdb {
        rating
        votes
      }
      genres
    }
  }
`;

interface Movie {
  _id: string;
  title: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
  };
  genres: string[];
}

export const FilterMovie = ({ genre }: { genre: string }) => {
  const { data, loading, error }: any = useQuery(GET_FILTER_MOVIE, {
    variables: { genre: genre, page: 1 },
  });

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col gap-2">
      {data?.movie?.map((movie: Movie) => (
        <div key={movie._id}>
          <p className="text-black">{movie.title}</p>
          <p className="text-blue-500"> {movie.year}</p>
          <p className="text-blue-500"> {movie.imdb.rating}</p>
          <p className="text-blue-500"> {movie.imdb.votes}</p>
          <p className="text-blue-500"> {movie.genres.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};
