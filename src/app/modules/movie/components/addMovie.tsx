import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $genres: [String], $year: Int!) {
    addMovie(title: $title, genres: $genres, year: $year) {
      _id
      title
      genres
      year
    }
  }
`;

export const AddMovie = ({
  title,
  genres,
  year,
}: {
  title: string;
  genres: string;
  year: number;
}) => {
  const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, {
    variables: {
      title: title,
      genres: genres,
      year: year,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <div className="pt-2">
      <button
        onClick={() => addMovie()}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Library"}
      </button>
    </div>
  );
};
