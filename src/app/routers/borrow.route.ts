import express, { NextFunction, Request, Response } from "express";
import {
  borrowBooks,
  gettingBorrowedBookSummary,
} from "../controllers/borrow.controller";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBooks);
borrowRoutes.get("/", gettingBorrowedBookSummary);
