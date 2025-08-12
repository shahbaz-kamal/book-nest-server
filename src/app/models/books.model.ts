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
    price:{type:Number},
    coverPage: { type: String, trim: true },
    showInHeroSection: { type: Boolean, default: false },
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

booksSchema.methods.updateAvailableCount = function () {
  this.available = this.copies > 0;
};

export const Books = model<IBook>("Books", booksSchema);
