import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_GENRE = gql`
  query {
    genre
  }
`;

export const useGenre = () => {
  const { data, loading, error }: any = useQuery(GET_GENRE);
  return {
    genres: (data?.genre ?? []) as string[],
    loading,
    error,
  };
};
