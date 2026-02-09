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
    <div>
      <button onClick={() => addMovie()}>Add Movie</button>
    </div>
  );
};
