import "dotenv/config";
import express, {Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/app.config";
import conncectDatabase from "./database/database";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(config.PORT, async () => {
  console.log(
    `Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
  await conncectDatabase();
});
