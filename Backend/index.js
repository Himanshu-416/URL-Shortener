import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookie from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config({ path: "./.env" });

//middlewares setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookie());

//import routers
import userRouter from "./routes/user.routes.js";

//implement routers
app.use("/api/v1/user", userRouter);

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
