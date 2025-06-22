import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";
import validator from "validator";

const booksSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
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
    isbn: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies Cannot be Negative"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Books = model("Books", booksSchema);
