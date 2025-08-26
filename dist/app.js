"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./app/middlewares/logger");
const books_route_1 = require("./app/routers/books.route");
const borrow_route_1 = require("./app/routers/borrow.route");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// middlewares
const corsOption = { origin: ["http://localhost:5173", "https://booknest-by-shahbaz.netlify.app"], Credential: true };
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use(logger_1.logger);
//using routes
app.use("/api/books", books_route_1.booksRoutes);
app.use("/api/borrow", borrow_route_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Book nest is running  ");
});
// handles 404 error
app.use((req, res, next) => {
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
app.use((error, req, res, next) => {
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
exports.default = app;
