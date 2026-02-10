import { Movies } from "../types/model";

export const MovieMutation = {
  addMovie: async (
    _root: any,
    { title, genres, year }: { title: string; genres: string[]; year: number },
  ) => {
    const movie = new Movies({
      title,
      genres,
      year,
    });
    return movie;
  },
};
