"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
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
    price: { type: Number },
    coverPage: { type: String, trim: true },
    showInHeroSection: { type: Boolean, default: false },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies Cannot be Negative"],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
booksSchema.methods.updateAvailableCount = function () {
    this.available = this.copies > 0;
};
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
