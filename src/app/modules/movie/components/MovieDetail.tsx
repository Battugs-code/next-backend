"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import router from "next/router";

const GET_MOVIE_DETAIL = gql`
  query Movie($id: ID) {
    movie(_id: $id) {
      _id
      title
      genres
      imdb {
        rating
        votes
      }
      year
      poster
      runtime
      directors
      plot
    }
  }
`;

export const MovieDetail = ({ movieId }: { movieId: string }) => {
  const { data, loading, error }: any = useQuery(GET_MOVIE_DETAIL, {
    variables: { id: movieId },
    skip: !movieId,
  });

  if (loading)
    return (
      <p className="text-center p-10 font-medium text-gray-600 animate-pulse">
        Loading movie details...
      </p>
    );
  if (error)
    return (
      <div className="text-center p-10">
        <p className="text-red-500 font-bold mb-2">Error loading movie</p>
        <p className="text-gray-600 italic leading-relaxed">{error.message}</p>
      </div>
    );
  if (!movieId)
    return (
      <p className="text-center p-10 text-gray-500">No movie ID provided.</p>
    );
  if (!data?.movie || data.movie.length === 0)
    return <p className="text-center p-10 text-gray-500">Movie not found.</p>;

  const movie = data.movie[0];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ring-1 ring-gray-200">
      <div className="w-full md:w-[350px] shrink-0 relative group">
        <img
          src={
            movie.poster ||
            "https://via.placeholder.com/400x600?text=No+Poster+Available"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">
            {movie.title}
          </h1>
          <div className="flex gap-2">
            <span className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-sm font-black shadow-lg shadow-blue-200">
              {movie.year}
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/">Back</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {movie.genres?.map((genre: string) => (
            <span
              key={genre}
              className="bg-gray-900 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            >
              {genre}
            </span>
          ))}
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {movie.runtime} MIN
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
            <p className="text-yellow-600 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
              IMDB Rating
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-yellow-800">
                ⭐ {movie.imdb?.rating}
              </span>
              <span className="text-yellow-600/60 text-xs font-medium">
                / 10
              </span>
            </div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <p className="text-indigo-600 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
              Total Votes
            </p>
            <p className="text-2xl font-black text-indigo-900 leading-none">
              {movie.imdb?.votes?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
              Directed By
            </p>
            <p className="text-lg font-bold text-gray-800 tracking-tight">
              {movie.directors?.join(" & ")}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h2 className="text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
              The Plot
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 font-medium italic">
              "{movie.plot || "No plot description available."}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
