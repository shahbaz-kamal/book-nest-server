import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBookById,
  updateBook,
} from "../controllers/books.controller";
export const booksRoutes = express.Router();

booksRoutes.post("/", createBook);

booksRoutes.get("/", getAllBooks);

booksRoutes.get("/:bookId", getSingleBookById);

booksRoutes.patch("/:bookId", updateBook);

booksRoutes.delete("/:bookId", deleteBook);
