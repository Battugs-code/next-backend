import { Document, Schema, model, Model, models } from "mongoose";

export interface IMoviesDocument extends Document {
  title: string;
  year: number;
  plot: string;
  poster: string;
  imdb: {
    rating: number;
    votes: number;
  };
  runtime: number;
  directors: string[];
  genres: string[];
}

// Define schema
const MovieSchema: Schema<IMoviesDocument> = new Schema({
  plot: { type: String },
  genres: { type: [String] },
  title: { type: String },
  year: { type: Number },
  poster: { type: String },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
  },
  runtime: { type: Number },
  directors: { type: [String] },
});

// ✅ Dev-safe model definition
export const Movies: Model<IMoviesDocument> =
  models.Movies || model<IMoviesDocument>("Movies", MovieSchema);
