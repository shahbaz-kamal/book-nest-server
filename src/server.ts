import { Server } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnok4yx.mongodb.net/book-nest?retryWrites=true&w=majority&appName=Cluster0`
    );

    const server: Server = app.listen(port, () => {
      console.log(`🔥 BookNest server is running on port ${port}`);
      console.log("✅ Connected to MongoDB using mongoose");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
