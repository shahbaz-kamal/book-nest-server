"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", books_controller_1.createBook);
exports.booksRoutes.get("/", books_controller_1.getAllBooks);
exports.booksRoutes.get("/:bookId", books_controller_1.getSingleBookById);
exports.booksRoutes.put("/:bookId", books_controller_1.updateBook);
exports.booksRoutes.delete("/:bookId", books_controller_1.deleteBook);
