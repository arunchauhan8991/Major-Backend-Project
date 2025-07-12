import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//use of middleware after building app so that we can use app
// app.use to use middleware


app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Frontend URL
    credentials: true, // Allow cookies/auth headers in cross-origin requests
  })
);


app.use(express.json({limit: "16kb"})) //body-parser now included in express by default to parse json data.


app.use(express.urlencoded({ extended: true, limit: "16kb"}))
// extended: false: Uses the querystring library (can only parse simple key-value pairs)  DEFAULT VALUE
// extended: true: Uses the qs library (can parse nested objects and arrays)


app.use(express.static("public"))
//  to serve static files (like HTML, CSS, JS, images) from the "public" folder


app.use(cookieParser())

export { app };
