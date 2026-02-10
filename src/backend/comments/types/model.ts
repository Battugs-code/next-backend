import { Document, Schema, model } from "mongoose";

export interface ICommentsDocument extends Document {
  name: string;
  email: string;
  text: string;
  movie_id: string;
  date: Date;
}

const CommentSchema: Schema<ICommentsDocument> = new Schema({
  name: { type: String },
  email: { type: String },
  text: { type: String },
  movie_id: { type: String },
  date: { type: Date },
});

export const Comments = model<ICommentsDocument>("comments", CommentSchema);
