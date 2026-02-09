"use client";
import { MovieDetail } from "../modules/movie/components/MovieDetail";
import { useSearchParams } from "next/navigation";

export default function Detail() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  return <MovieDetail movieId={movieId as string} />;
}
