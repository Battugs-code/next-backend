import { Movies } from "../types/model";

export const MovieQuery = {
  movies: async (_root: any, { title }: { title: string }) => {
    const perPage = 20;

    if (title) {
      return Movies.find({ title }).limit(perPage);
    }

    return Movies.find().limit(perPage);
  },
  movie: async (_root: any, { genre, _id }: { genre: string; _id: string }) => {
    const perPage = 20;

    if (genre) {
      return Movies.find({ genres: genre }).limit(perPage);
    }

    if (_id) {
      return Movies.find({ _id }).limit(perPage);
    }

    return Movies.find().limit(perPage);
  },
};
