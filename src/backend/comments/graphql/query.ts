import { Comments } from "../types/model";

export const CommentsQuery = {
  comment: async (
    _root: any,
    { _id, movie_id }: { _id: string; movie_id: string },
  ) => {
    const perPage = 3;

    if (_id) {
      return Comments.find({ _id }).limit(perPage);
    }
    if (movie_id) return Comments.find({ movie_id }).limit(perPage);
    return Comments.find().limit(perPage);
  },
};
