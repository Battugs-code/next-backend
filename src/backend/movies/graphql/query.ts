import { Movies } from "../types/model";

const perPage = 10;
export const MovieQuery = {
  movies: async (
    _root: any,
    { title, page }: { title: string; page: number },
  ) => {
    const skip = (page - 1) * perPage;
    if (title) {
      return Movies.find({ title }).limit(perPage).skip(skip);
    }

    return Movies.find().limit(perPage).skip(skip);
  },
  movie: async (
    _root: any,
    { genre, _id, page }: { genre: string; _id?: string; page: number },
  ) => {
    const skip = page ? (page - 1) * perPage : 0;
    if (genre) {
      return Movies.find({ genres: genre }).limit(perPage).skip(skip);
    }

    if (_id) {
      return Movies.find({ _id }).limit(perPage).skip(skip);
    }

    return Movies.find().limit(perPage).skip(skip);
  },

  genre: async () => {
    const data = await Movies.distinct("genres");
    return data;
  },
};
