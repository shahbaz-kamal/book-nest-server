import express, { Application, NextFunction, Request, Response } from "express";
import { logger } from "./app/middlewares/logger";
import { booksRoutes } from "./app/routers/books.route";
import { borrowRoutes } from "./app/routers/borrow.route";
import cors from "cors";

const app: Application = express();

// middlewares

const corsOption = {
  origin: ["http://localhost:5173", "https://booknest-by-shahbaz.netlify.app"],
  Credential: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(logger);

//using routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Book nest is running  ");
});

// handles 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route Not Found",
    success: false,
    error: {
      name: "NotFoundError",
      details: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
  next();
});

// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   if (error.name === "ValidationError") {
//      res.status(400).json({
//       message: "Validation failed",
//       success: false,
//       error: error,
//     });
//   }
//   // Generic fallback
//   res.status(500).json({
//     message: "Something went wrong",
//     success: false,
//     error: error.message,
//   });
// });
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
    return;
  }

  if (error.name === "ReferenceError") {
    res.status(400).json({
      message: error.message,
      success: false,
      error: {
        name: error.name,
        details: error.details || null,
      },
    });
    return;
  }

  // Generic fallback
  res.status(500).json({
    message: "Something went wrong",
    success: false,
    error,
  });
  return;
});

export default app;
