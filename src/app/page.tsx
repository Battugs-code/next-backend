"use client";
import { AllMovie } from "../app/modules/movie/components/AllMovie";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { FilterMovie } from "../app/modules/movie/components/FilterMovie";
import { useState } from "react";
import { AddMovie } from "../app/modules/movie/components/addMovie";
import { MovieDetail } from "../app/modules/movie/components/MovieDetail";

export default function Home() {
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(Number);
  const [genres, setGenres] = useState("");
  const [movieId, setMovieId] = useState("");
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Filter by genre..."
          className="border p-2 rounded text-black"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-black">All Movies</h2>
          <AllMovie />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-black">
            Filtered Movies ({genre || "None"})
          </h2>
          {genre && <FilterMovie genre={genre} />}
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genres"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <AddMovie title={title} genres={genres} year={year} />
        <MovieDetail movieId={movieId} />
      </div>
    </div>
  );
}
