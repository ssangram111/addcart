import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import morgan from "morgan";
import router from "./routes/Auth.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow requests from any domain
    optionsSuccessStatus: 200,
  })
);
//config env
dotenv.config();
//connect Database
connectDB();
//middleware
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api", router);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Server is running on Port ${port}!`.bgBlue.white)
);
