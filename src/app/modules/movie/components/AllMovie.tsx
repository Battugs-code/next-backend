"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";

const GET_ALL_MOVIE = gql`
  query Movies($page: Int!) {
    movies(page: $page) {
      _id
      title
      imdb {
        rating
        votes
      }
      genres
      poster
    }
  }
`;

interface Movie {
  _id: string;
  title: string;

  imdb: {
    rating: number;
    votes: number;
  };
  genres: string[];
  poster: string;
}

export const AllMovie = () => {
  const { data, loading, error }: any = useQuery(GET_ALL_MOVIE, {
    variables: { page: 1 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col gap-2">
      {data?.movies?.map((movie: Movie) => (
        <div key={movie._id}>
          <img src={movie.poster} alt={movie.title} />
          <p className="text-red-500">{movie.title}</p>
          <p className="text-blue-500">{movie._id}</p>

          <p>
            <span className="font-bold">IMDB rating:</span> {movie.imdb?.rating}
          </p>
          <p>
            <span className="font-bold">IMDB votes:</span> {movie.imdb?.votes}
          </p>
          <p>
            <span className="font-bold">genres:</span> {movie.genres.join(", ")}
          </p>
          <Link href={`/detail?id=${movie._id}`}>See Details</Link>
        </div>
      ))}
    </div>
  );
};
