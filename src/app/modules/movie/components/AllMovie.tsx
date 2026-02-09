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

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-[#1a1a1a] rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <p className="text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-900/50">
        Error: {error.message}
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data?.movies?.map((movie: Movie) => (
        <div
          key={movie._id}
          className="group bg-[#1a1a1a] border border-[#222] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="relative aspect-2/3 overflow-hidden">
            <img
              src={
                movie.poster ||
                "https://via.placeholder.com/400x600?text=No+Poster"
              }
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-xl uppercase tracking-tighter">
                {movie.imdb?.rating} ⭐
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg truncate mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
              {movie.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium truncate mb-3">
              {movie.genres.join(" • ")}
            </p>
            <Link
              href={`/detail?id=${movie._id}`}
              className="block w-full text-center py-2 bg-[#222] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-widest"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
