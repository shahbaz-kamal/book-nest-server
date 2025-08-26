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
exports.deleteBook = exports.updateBook = exports.getSingleBookById = exports.getAllBooks = exports.createBook = void 0;
const books_model_1 = require("../models/books.model");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = req.body;
        const book = yield books_model_1.Books.create(newBook);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        // console.log(filter, sortBy, sort, limit);
        let queryFilter = {};
        let querySort = {};
        let queryLimit;
        if (filter) {
            queryFilter.genre = filter;
        }
        if (sortBy && sort) {
            querySort[sortBy] = sort === "asc" ? 1 : -1;
        }
        if (limit) {
            queryLimit = parseInt(limit);
        }
        // console.log("from query sort", querySort);
        let query = books_model_1.Books.find(queryFilter).sort(querySort);
        if (limit) {
            query = query.limit(parseInt(limit));
        }
        const books = yield query;
        // console.log(books);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getSingleBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        res.status(200).json({
            success: !book ? false : true,
            message: !book ? "Book Not Found" : "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBookById = getSingleBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        console.log("bookId", bookId);
        const body = Object.assign(Object.assign({}, req.body), { price: Number(req.body.price), copies: Number(req.body.copies) });
        console.log("body", body);
        const book = yield books_model_1.Books.findByIdAndUpdate(bookId, body, {
            new: true,
            runValidators: true,
        });
        console.log("books===>", book);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield books_model_1.Books.findByIdAndDelete(bookId);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
