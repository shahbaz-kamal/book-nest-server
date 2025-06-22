"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettingBorrowedBookSummary = exports.borrowBooks = void 0;
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
const borrowBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const findBook = yield books_model_1.Books.findById(book);
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
        yield findBook.save();
        const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed Successfully",
            data: borrow,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBooks = borrowBooks;
const gettingBorrowedBookSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBookSummary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        next(error);
    }
});
exports.gettingBorrowedBookSummary = gettingBorrowedBookSummary;
