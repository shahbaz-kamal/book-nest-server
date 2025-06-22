import { updateBook } from "./books.controller";
import { NextFunction, Request, Response } from "express";
import { Books } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const findBook: any = await Books.findById(book);
    if (findBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: `Only ${findBook.copies} copies left. So, You can borrow maximum of ${findBook.copies} copies`,
      });
      return;
    }

    findBook.copies = findBook.copies - quantity;
    findBook.updateAvailableCount();
    await findBook.save();
    const borrow = await Borrow.create({ book, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed Successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export const gettingBorrowedBookSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowedBookSummary = await Borrow.aggregate([
      //1:grouping by book id
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // 2: lokking up book details
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInformation",
        },
      },
      //3. unwinding book information into a single object
      {
        $unwind: "$bookInformation",
      },
      // 4. final output generation
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInformation.title",
            isbn: "$bookInformation.isbn",
          },
        },
      },
    ]);
    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBookSummary,
    });
  } catch (error) {
    next(error);
  }
};
