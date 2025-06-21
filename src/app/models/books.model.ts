import { Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";
import validator from "validator";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: [
      "FANTASY",
      "BIOGRAPHY",
      "HISTORY",
      "SCIENCE",
      "NON_FICTION",
      "FICTION",
    ],
  },
  isbn: { type: String, required: true },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: [0, "Copies Cannot be Negative"],
  },
  available: { type: Boolean, default: true },
});
