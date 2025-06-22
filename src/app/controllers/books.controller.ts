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
    res.send("all book get rout has been hit");
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
    res.send("Get single book route by id has benn hit");
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
    res.send("Update book route by id has benn hit");
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
    res.send("Delete book route by id has benn hit");
  } catch (error: any) {
    next(error);
  }
};
