import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookie from "cookie-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config({ path: "./.env" });

//import custom middlewares
import Auth from "./middlewares/Auth.js";

//middlewares setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookie());
app.use(Auth);

//import routers
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import staticRouter from "./routes/static.routes.js";	

//implement routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/url", urlRouter);
app.use("/api/v1/test", staticRouter)


app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({statusCode: err.statusCode,message: err.message})
  }
})

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

  