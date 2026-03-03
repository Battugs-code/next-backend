"use client";
import { AllMovie } from "./components/AllMovie";
import { FilterMovie } from "./components/FilterMovie";
import { useState } from "react";
import { AddMovie } from "./components/addMovie";
import { Button } from "@/components/ui/button";
import { useGenre } from "./components/allGenre";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from "@/app/(auth)/logout";

export default function MainMovie() {
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [genres, setGenres] = useState("");
  const [movieId, setMovieId] = useState("");

  const { genres: allGenre } = useGenre();

  const inputClasses =
    "w-full bg-[#1a1a1a] border border-[#333] p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500";
  const labelClasses =
    "text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] p-6 lg:p-12 bg-gradient-movie">
      <Logout />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter Movie</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Filter Movie</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  {allGenre?.map((g: string) => (
                    <DropdownMenuItem key={g} onClick={() => setGenre(g)}>
                      {g}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
        </div>

        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="bg-[#111] border border-[#222] rounded-3xl p-6">
              {genre ? <FilterMovie genre={genre} /> : <AllMovie />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
