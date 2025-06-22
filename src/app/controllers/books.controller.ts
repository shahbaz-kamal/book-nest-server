import { NextFunction, Request, Response } from "express";
import { Books } from "../models/books.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = req.body;
    const book = await Books.create(newBook);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    console.log(filter, sortBy, sort, limit);

    let queryFilter: any = {};
    let querySort: any = {};
    let queryLimit: number = 10;
    if (filter) {
      queryFilter.genre = filter;
    }

    if (sortBy && sort) {
      querySort[sortBy as string] = sort === "asc" ? 1 : -1;
    }

    if (limit) {
      queryLimit = parseInt(limit as string);
    }
    // console.log("from query sort", querySort);

    const books = await Books.find(queryFilter)
      .sort(querySort)
      .limit(queryLimit);
    console.log(books);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getSingleBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);
    res.status(200).json({
      success: !book ? false : true,
      message: !book ? "Book Not Found" : "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = await Books.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    await Books.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};
