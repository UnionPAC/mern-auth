import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.port || 5001;

connectDB();

const app = express();

app.use(cookieParser());

// adds middleware that parses incoming requests with JSON payloads
// allows app to handle JSON data sent in the req.body
app.use(express.json({ limit: "50mb" }));

// adds middleware that parses incoming requests with URL-encoded payloads
// enables app to handle data sent in req.body using URL-encoded format
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // Use our frontend static build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running and in deployment ...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
