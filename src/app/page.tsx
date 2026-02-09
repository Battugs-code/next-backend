"use client";
import { AllMovie } from "../app/modules/movie/components/AllMovie";
import { FilterMovie } from "../app/modules/movie/components/FilterMovie";
import { useState } from "react";
import { AddMovie } from "../app/modules/movie/components/addMovie";

export default function Home() {
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [genres, setGenres] = useState("");
  ``;
  const [movieId, setMovieId] = useState("");

  const inputClasses =
    "w-full bg-[#1a1a1a] border border-[#333] p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500";
  const labelClasses =
    "text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] p-6 lg:p-12 bg-gradient-movie">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Management Tools */}
        <div className="lg:col-span-4 space-y-8">
          {/* Section 1: Filter */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={labelClasses}>Filter Movie</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Action, Comedy..."
                  className={inputClasses}
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
                {genre && (
                  <button
                    onClick={() => setGenre("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    aria-label="Clear genre"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Add New */}
          <section className="glass p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Add New Movie
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Movie Title</label>
                <input
                  type="text"
                  placeholder="Enter title..."
                  className={inputClasses}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Year</label>
                  <input
                    type="number"
                    placeholder="2024"
                    className={inputClasses}
                    value={year || ""}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Genres</label>
                  <input
                    type="text"
                    placeholder="Action, Sci-Fi"
                    className={inputClasses}
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  />
                </div>
              </div>
              <AddMovie title={title} genres={genres} year={year} />
            </div>
          </section>

          {/* Section 3: Movie Detail Picker */}
        </div>

        {/* Right Column: Listings */}
        <div className="lg:col-span-8 space-y-10">
          <section>
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight"></h2>
            <div className="bg-[#111] border border-[#222] rounded-3xl p-6">
              {genre ? <FilterMovie genre={genre} /> : <AllMovie />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
