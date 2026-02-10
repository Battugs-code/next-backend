import { Comments } from "../types/model";

export const CommentsMutation = {
  addComment: async (
    _root: any,
    {
      name,
      email,
      text,
      movie_id,
      date,
    }: {
      name: string;
      email: string;
      text: string;
      movie_id: string;
      date: string;
    },
  ) => {
    const comment = new Comments({
      name,
      email,
      text,
      movie_id,
      date,
    });
    return comment;
  },
};
