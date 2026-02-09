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
    <div className="glass rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5 ring-1 ring-white/10">
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

      <div className="p-8 md:p-12 flex flex-col flex-1 bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <h1 className="text-5xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            {movie.title}
          </h1>
          <div className="flex gap-3">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-blue-500/20 uppercase tracking-widest">
              {movie.year}
            </span>
            <Link
              href="/"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-2xl text-xs font-black transition-all uppercase tracking-widest"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {movie.genres?.map((genre: string) => (
            <span
              key={genre}
              className="bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase"
            >
              {genre}
            </span>
          ))}
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {movie.runtime} MIN
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-yellow-500/5 p-5 rounded-3xl border border-yellow-500/10">
            <p className="text-yellow-500/60 text-[9px] font-black uppercase tracking-[0.25em] mb-2">
              IMDB Rating
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-yellow-500 italic">
                {movie.imdb?.rating}
              </span>
              <span className="text-yellow-500/30 text-xs font-medium">
                / 10
              </span>
            </div>
          </div>
          <div className="bg-indigo-500/5 p-5 rounded-3xl border border-indigo-500/10">
            <p className="text-indigo-400/60 text-[9px] font-black uppercase tracking-[0.25em] mb-2">
              Total Votes
            </p>
            <p className="text-3xl font-black text-white italic leading-none">
              {movie.imdb?.votes?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.25em] mb-3">
              Visionary Director
            </p>
            <p className="text-xl font-bold text-white tracking-tight flex gap-3">
              {movie.directors?.map((d: string) => (
                <span
                  key={d}
                  className="underline decoration-blue-500/50 decoration-2 underline-offset-4"
                >
                  {d}
                </span>
              ))}
            </p>
          </div>

          <div className="pt-8 border-t border-white/5">
            <h2 className="text-white/40 text-[9px] font-black uppercase tracking-[0.25em] mb-4">
              Synopsis
            </h2>
            <p className="text-xl leading-relaxed text-gray-300 font-medium italic font-serif">
              "{movie.plot || "No plot description available."}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
